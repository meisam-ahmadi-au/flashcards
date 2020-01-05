import moment from 'moment';
import { firestore, functions } from '../firebase/firebase';
import { ICategory, INewCard, IUpdateCard } from '../util/interfaces';

class FlashCardApis {
  public static retreiveTodaysCardsByCategoryId = async (
    categoryId: string,
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
    }));

    return [...cardsSnapshot];
  };

  public static getCategoryDetailByCategoryName = async (
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

  public static addCard = (uid: string, categoryId: string) => async (
    card: INewCard
  ) => await firestore.collection(`cards/${uid}/${categoryId}`).add(card);

  public static updateCard = (uid: string, categoryId: string) => async (
    updatedCard: IUpdateCard
  ) =>
    await firestore
      .doc(`cards/${uid}/${categoryId}/${updatedCard.cardId}`)
      .update(updatedCard);

  public static getAllCategories = async (uid: string) => {
    const categoriesCollection = await firestore
      .doc(`otherInfo/${uid}`)
      .collection(`categories`)
      .get()
      .catch(console.log);

    if (!categoriesCollection) {
      return;
    }
    const allCategories = categoriesCollection.docs.map(doc =>
      doc.data()
    ) as ICategory[];

    const allCategoriesSorted = allCategories.sort((catA, catB) =>
      catA.category > catB.category ? 1 : -1
    );

    return allCategoriesSorted;
  };

  public static getAllCardsInCategory = async (
    uid: string,
    category: string
  ) => {
    const { data } = await functions.httpsCallable('getAllCardsByCategoryName')(
      { category }
    );
    const { allCards } = data;
    return [...allCards];
  };

  public static addCategory = async (category: string) =>
    await functions.httpsCallable('addCategory')({ category });

  public static deleteCard = async (category: string, cardId: string) =>
    functions.httpsCallable('deteleCard')({ category, cardId });

  public static deleteCategory = async (category: string) =>
    functions.httpsCallable('deleteCategory')({ category });
}

export default FlashCardApis;
