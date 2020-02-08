import moment from 'moment';
import {
  firestore,
  functions
} from '../components/FirebaseAuthentication/FirebaseAuthentication';
import { INewCard, IUpdateCard, ICard } from '../util/interfaces';

const retreiveTodaysCardsByCategoryId = async (
  categoryId: number,
  uid: string
) => {
  const startOfToday = moment()
    .startOf('day')
    .valueOf();

  const cardsRef = await firestore
    .collection(`cards/${uid}/${categoryId}`)
    .where('nextReadTime', '<', startOfToday)
    .orderBy('nextReadTime')
    .get();

  const cardsSnapshot = cardsRef.docs.map(doc => ({
    ...doc.data(),
    cardId: doc.id
  })) as ICard[];

  return [...cardsSnapshot];
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

const getAllCategories = async (uid: string) => {
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
  updateCategory
};
