import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const firestore = admin.firestore();

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
    const newCategorySnapshot = await categoriesRef
      .where('category', '==', category.toLowerCase())
      .get();

    if (newCategorySnapshot.empty) {
      const categoryDoc = categoriesRef.doc();
      const categoryId = await categoryDoc.get().then(doc => doc.id);
      const createdAt = Date.now();

      await categoriesRef.doc(categoryId).set({
        category: category.toLowerCase(),
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
