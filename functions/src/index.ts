// ! GOOGLE Functions

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';

admin.initializeApp();
const firestore = admin.firestore();

// #region users
export const createUserProfile = functions.auth.user().onCreate(async user => {
  const userRef = await firestore.doc(`users/${user.uid}`);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const { displayName, email, photoURL, uid } = user;
    const createdAt = new Date();

    await userRef
      .set({ displayName, email, photoURL, uid, createdAt })
      .catch(err => console.log(err));
  }
});
// #endregion

export const updateCardsCountOnCreate = functions.firestore
  .document(`cards/{userId}/{categoryId}/{cardId}`)
  .onCreate(async (snapshot, context) => {
    const { userId, categoryId } = context.params;
    const otherInfoRef = firestore.doc(
      `otherInfo/${userId}/categories/${categoryId}`
    );

    return otherInfoRef.update({
      totalNumberOfCards: admin.firestore.FieldValue.increment(1)
    });
  });

export const updateCardsCountOnDelete = functions.firestore
  .document(`cards/{userId}/{categoryId}/{cardId}`)
  .onDelete(async (snapshot, context) => {
    const { userId, categoryId } = context.params;
    const otherInfoRef = firestore.doc(
      `otherInfo/${userId}/categories/${categoryId}`
    );

    return otherInfoRef.update({
      totalNumberOfCards: admin.firestore.FieldValue.increment(-1)
    });
  });

export const addCategory = functions.https.onCall(
  async ({ category }: { category: string }, context) => {
    const uid = context.auth!.uid;
    const categoriesRef = firestore.collection(`otherInfo/${uid}/categories`);

    const newCategorySnapshot = await categoriesRef.get();
    let categoryExists = false;
    if (!newCategorySnapshot.empty) {
      categoryExists =
        newCategorySnapshot.docs
          .map(doc => doc.data())
          .findIndex(
            doc => doc.category.toLowerCase() === category.toLowerCase()
          ) !== -1;
    }

    if (newCategorySnapshot.empty || !categoryExists) {
      const categoryDoc = categoriesRef.doc();
      const categoryId = await categoryDoc.get().then(doc => doc.id);
      const createdAt = Date.now();

      await categoriesRef.doc(categoryId).set({
        category,
        createdAt,
        totalNumberOfCards: 0,
        tags: '',
        categoryId
      });

      return {
        category,
        isSucceessful: true
      };
    } else {
      return new functions.https.HttpsError(
        'already-exists',
        'Category already exists',
        {
          isSucceessful: false,
          reason: 'Category already exists'
        }
      );
    }
  }
);

export const getAllCardsByCategoryName = functions.https.onCall(
  async ({ category }, context) => {
    const uid = context.auth!.uid;
    const { categoryId } = await getCategoryDetailByCategoryName(uid, category);
    const cardsRef = await firestore
      .collection(`cards/${uid}/${categoryId}`)
      .get();

    const allCards = cardsRef.docs.map(doc => ({
      ...doc.data(),
      categoryId,
      cardId: doc.id
    }));

    return {
      allCards,
      isSucceessful: true
    };
  }
);

export const deleteCategory = functions.https.onCall(
  async ({ category }, context) => {
    const uid = context.auth!.uid;
    const { categoryId } = await getCategoryDetailByCategoryName(uid, category);
    const categoryRef = await firestore.doc(
      `otherInfo/${uid}/categories/${categoryId}`
    );
    const categroyInfo = await categoryRef.get();
    if (categroyInfo.data()!.totalNumberOfCards === 0) {
      return categoryRef.delete().then(() => ({ isSucceessful: true }));
    }
    return new functions.https.HttpsError('unknown', 'failed', {
      isSucceessful: false,
      reason: 'category is not empty'
    });
  }
);

export const getTodaysCardsByCategoryId = functions.https.onCall(
  async ({ categoryId, uid }, context) => {
    const cardSnapshot = await retreiveTodaysCardsByCategoryId(categoryId, uid);
    return {
      cardSnapshot,
      isSucceessful: true
    };
  }
);

export const deteleCard = functions.https.onCall(
  async ({ category, cardId }, context) => {
    const uid = context.auth!.uid;
    const { categoryId } = await getCategoryDetailByCategoryName(uid, category);
    return firestore
      .collection(`cards/${uid}/${categoryId}`)
      .doc(cardId)
      .delete()
      .then(() => ({ isSucceessful: true }))
      .catch(
        error =>
          new functions.https.HttpsError('unknown', 'failed', {
            isSucceessful: false,
            reason: error
          })
      );
  }
);

export const getAllCategories = functions.https.onCall(
  async (empty, context) => {
    const uid = context.auth!.uid;

    if (!uid) {
      return;
    }

    const categoriesCollection = await firestore
      .doc(`otherInfo/${uid}`)
      .collection(`categories`)
      .get();

    if (categoriesCollection.empty) {
      return;
    }

    const allCategories = categoriesCollection.docs.map(doc => doc.data());
    const allCategriesUpdated = await Promise.all(
      allCategories.map(async category => {
        const todaysCard = await retreiveTodaysCardsByCategoryId(
          category.categoryId,
          uid
        );
        category.numberOfUnreviewedCards = todaysCard.length;
        return category;
      })
    );

    const allCategoriesSorted = allCategriesUpdated.sort((catA, catB) =>
      catA.category > catB.category ? 1 : -1
    );

    return allCategoriesSorted;
  }
);

export const updateCategory = functions.https.onCall(
  async ({ oldCategoryName, newCategoryName }, context) => {
    const uid = context.auth!.uid;
    const categoriesRef = firestore.collection(`otherInfo/${uid}/categories`);
    const newCategorySnapshot = await categoriesRef.get();
    let categoryExists = false;

    if (!newCategorySnapshot.empty) {
      categoryExists =
        newCategorySnapshot.docs
          .map(doc => doc.data())
          .findIndex(
            doc => doc.category.toLowerCase() === newCategoryName.toLowerCase()
          ) !== -1;
    }

    if (newCategorySnapshot.empty || !categoryExists) {
      const { categoryId } = await getCategoryDetailByCategoryName(
        uid,
        oldCategoryName
      );

      await firestore
        .doc(`otherInfo/${uid}/categories/${categoryId}`)
        .update({ category: newCategoryName });

      return { isSucceessful: true };
    }

    return new functions.https.HttpsError('unknown', 'failed', {
      isSucceessful: false,
      reason: 'category name already exists'
    });
  }
);

const getCategoryDetailByCategoryName = async (
  uid: string,
  category: string
) => {
  const categoriesRef = await firestore
    .collection(`otherInfo/${uid}/categories`)
    .get();

  const categoriesSnapshot = categoriesRef.docs
    .map(doc => doc.data())
    .filter(doc => doc.category.toLowerCase() === category.toLowerCase());

  return { ...categoriesSnapshot[0] };
};

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
  }));

  return cardsSnapshot;
};
