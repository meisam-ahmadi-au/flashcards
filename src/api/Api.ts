import {
  firestore,
  functions
} from '../components/FirebaseAuthentication/FirebaseAuthentication';
import { INewCard, IUpdateCard } from '../util/interfaces';
import Axios from 'axios';

const retreiveTodaysCardsByCategoryId = async (
  categoryId: number,
  uid: string
) => {
  const { data } = await functions.httpsCallable('getTodaysCardsByCategoryId')({
    categoryId,
    uid
  });
  debugger;
  console.log({ data });

  const { cardSnapshot } = data;
  return [...cardSnapshot];
};

const getCategoryDetailByCategoryName = async (
  uid: string,
  category: string
) => {
  const categoriesRef = await firestore
    .collection(`otherInfo/${uid}/categories`)
    .where('category', '==', category.toLowerCase())
    .get();

  const categoriesSnapshot = categoriesRef.docs.map(doc => doc.data());
  return { ...categoriesSnapshot[0] };
};

const addCard = (uid: string | number, categoryId: number) => async (
  card: INewCard
) => await firestore.collection(`cards/${uid}/${categoryId}`).add(card);

const updateCard = (
  uid: string | number,
  categoryId: string | number
) => async (updatedCard: IUpdateCard) => {
  await firestore
    .doc(`cards/${uid}/${categoryId}/${updatedCard.cardId}`)
    .update(updatedCard);
};

const getAllCategories = async () => {
  const { data: allCategoriesSorted } = await functions.httpsCallable(
    'getAllCategories'
  )();
  return allCategoriesSorted;
};

const getAllCardsInCategory = async (uid: string, category: string) => {
  const { data } = await functions.httpsCallable('getAllCardsByCategoryName')({
    category
  });
  const { allCards } = data;
  return [...allCards];
};

const addCategory = async (category: string) =>
  await functions.httpsCallable('addCategory')({ category });

const deleteCard = async (category: string, cardId: string) =>
  functions.httpsCallable('deteleCard')({ category, cardId });

const deleteCategory = async (category: string) =>
  functions.httpsCallable('deleteCategory')({ category });

const updateCategory = (oldCategoryName: string) => async (
  newCategoryName: string
) =>
  functions.httpsCallable('updateCategory')({
    oldCategoryName,
    newCategoryName
  });

const getPronunciation = (text: string) => {
  const MerisamWebsterApiKey = process.env.REACT_APP_MERRIAM_WEBSTER;
  const meriamWebsterUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${text}?key=${MerisamWebsterApiKey}`;

  return Axios.get(meriamWebsterUrl)
    .then(res => res.data[0])
    .then(res => res.hwi.prs[0].sound.audio)
    .catch(console.log);
};

export default {
  retreiveTodaysCardsByCategoryId,
  getCategoryDetailByCategoryName,
  addCard,
  updateCard,
  getAllCategories,
  getAllCardsInCategory,
  addCategory,
  deleteCard,
  deleteCategory,
  updateCategory,
  getPronunciation
};
