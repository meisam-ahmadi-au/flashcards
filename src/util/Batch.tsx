import { firestore, functions } from '../firebase/firebase';

export const doBatch = (adjectives: any, state: any, context: any) => {
  console.log('cards =>', Object.keys(adjectives).length);
  const { categoryId } = state;
  const user = context as firebase.User;
  const cards = Object.keys(adjectives)
    .map(adj => adjectives[adj])
    .map(({ back, front, time }) => ({
      back,
      front,
      createdAt: time,
      nextReadTime: time,
      shouldReadFront: true,
      learningCurve: [time]
    }));

  console.log(cards);
  const batch = firestore.batch();
  cards.forEach(adj => {
    batch.set(
      firestore.collection(`cards/${user.uid}/${categoryId}`).doc(),
      adj
    );
  });

  batch
    .commit()
    .then(a => console.log({ a }))
    .catch(err => console.log({ err }));
};

export const categoryUpload = (cats: any) => {
  const catcall = cats.map((category2: any) =>
    functions.httpsCallable('addCategory')({ category: category2 })
  );
  Promise.all(catcall).then(console.log);
};
