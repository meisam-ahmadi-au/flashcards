import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useDispatch } from 'react-redux';
import { Actions } from '../../store/actions/actionTypes';
import { routes } from '../../util/constants';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GKEY,
  authDomain: 'awesomeflashcard.firebaseapp.com',
  databaseURL: 'https://awesomeflashcard.firebaseio.com',
  projectId: 'awesomeflashcard',
  storageBucket: 'awesomeflashcard.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.functions().useFunctionsEmulator('http://localhost:5000');

// authentication
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const googleSignIn = () => auth.signInWithPopup(provider);
export const signout = () => auth.signOut();
export const signInWithUserName = auth.signInWithEmailAndPassword;
export const firestore = firebase.firestore();
export const functions = firebase.functions();

const FirebaseAuthentication = () => {
  // #region uiConfig
  const dispatch = useDispatch();
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: routes.LANDING,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult(authResult: any, redirectUrl: any) {
        const user = authResult.user;
        dispatch(Actions.setUser(user));
        redirectUrl('/');
        return true;
      }
    }
  };
  // # endregion
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};

export default FirebaseAuthentication;
