import { User as FirebaseUser } from 'firebase';
import { firestore } from './firebase';

export const createUserProfile = async (
  user: FirebaseUser | null,
  aditionalData?: any
) => {
  if (!user) {
    return;
  }

  const userRef = await firestore.doc(`users/${user.uid}`);
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    await userRef
      .set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...aditionalData
      })
      .catch(err => console.log(err));
  }
  return getUserRef(user.uid);
};

export const getUserRef = async (uid: string) => {
  if (!uid) {
    return;
  }
  try {
    return await firestore.collection('users').doc(uid);
  } catch (err) {
    console.log(err);
  }
};
