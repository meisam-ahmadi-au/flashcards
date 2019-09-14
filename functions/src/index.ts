import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const firestore = admin.firestore();
console.log('Started...');

// * Start writing Firebase Functions
// TODO https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  if (request.get('Authorization')) {
    response.send('zeresh');
  }
  // respond.send(request.get('Authorization'));
  response.send('Hello');
});

export const updateCardsCount = functions.firestore
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
