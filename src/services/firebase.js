import * as firebase from 'firebase';
import 'firebase/firestore';

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from 'react-native-dotenv'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};


let HAS_INITIALIZED = false

/**
 * Initialize Firebase if uninitialized 
 */
const initFirebase = () => {
  if (!HAS_INITIALIZED) {
    firebase.initializeApp(firebaseConfig);
    HAS_INITIALIZED = true;
  }
}

export const database = () => {
  initFirebase();
  return firebase.database();
}

export const auth = () => {
  initFirebase();
  return firebase.auth();
}

export const firestore = () => {
  initFirebase();
  return firebase.firestore();
}

export const storage = () => {
  initFirebase();
  return firebase.storage();
}

export const serverTimestamp = () => {
  initFirebase();
  return firebase.firestore.FieldValue.serverTimestamp();
}

export const credential = (user,password) => {
  initFirebase();
  return firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
};


