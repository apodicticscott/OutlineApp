// database/firebaseDb.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCNvho7xS_Vl82sNgx-QwnEJ24ZxfEj0FU",
    authDomain: "outlineapp-2251a.firebaseapp.com",
    projectId: "outlineapp-2251a",
    storageBucket: "outlineapp-2251a.appspot.com",
    messagingSenderId: "612232892355",
    appId: "1:612232892355:web:ab87e49fcbf799a8f2b776"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };