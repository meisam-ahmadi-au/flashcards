import {
  auth,
  firestore,
  signout
} from '../../components/FirebaseAuthentication/FirebaseAuthentication';
import { ActionCreators } from './actionTypes';

let unsubscribeFromAuthentication: () => void;
let unsubscribeFromUser: () => void;

export const subscribeToAuth = () => async (
  dispatch: any,
  getState: () => any
) => {
  unsubscribeFromAuthentication = auth.onAuthStateChanged(async userAuth => {
    if (!userAuth) {
      localStorage.setItem('user', JSON.stringify(null));
      dispatch(ActionCreators.unsetUser());
    } else if (userAuth.uid !== getState().auth?.user?.uid) {
      dispatch(getUserData(userAuth));
    }
  });
};

// #region helper for Auth Subscription
const getUserData = (userAuth: firebase.User) => async (
  dispatch: any,
  getState: () => any
) => {
  const currentStateUser = getState().auth?.user;
  const userRef = await firestore.collection('users').doc(userAuth.uid);
  if (!userRef) {
    localStorage.setItem('user', JSON.stringify(userAuth));
    if (currentStateUser.uid !== userAuth.uid) {
      dispatch(ActionCreators.setUser(userAuth));
    }
  } else {
    unsubscribeFromUser = userRef.onSnapshot(
      userSnapshot => {
        localStorage.setItem('user', JSON.stringify(userSnapshot.data()));
        if (currentStateUser.uid !== userSnapshot.data()?.uid) {
          dispatch(
            ActionCreators.setUser(userSnapshot.data() as firebase.User)
          );
        }
      },
      err => console.log({ err })
    );
  }
};
// #endregion

export const unsubscribeFromAuth = () => async (disaptch: any) => {
  if (unsubscribeFromAuthentication) {
    unsubscribeFromAuthentication();
  }
};

export const logout = () => async (dispatch: any) => {
  if (unsubscribeFromUser) {
    unsubscribeFromUser();
  }

  if (unsubscribeFromAuthentication) {
    unsubscribeFromAuthentication();
  }

  dispatch(ActionCreators.unsetUser());
  await signout();
};

