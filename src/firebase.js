import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7ETEOnQQcsqK9H0FkACdxiK6wZbxnSkE",
  authDomain: "student-success-companion.firebaseapp.com",
  projectId: "student-success-companion",
  storageBucket: "student-success-companion.firebasestorage.app",
  messagingSenderId: "839936767899",
  appId: "1:839936767899:web:2da1e849bd4c306a72933e",
};

const app = initializeApp(firebaseConfig);

console.log(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);