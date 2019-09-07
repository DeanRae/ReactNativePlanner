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

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const database = firebase.database();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const serverTimestamp = () => {firebase.firestore.FieldValue.serverTimestamp();};