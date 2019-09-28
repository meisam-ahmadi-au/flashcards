import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

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