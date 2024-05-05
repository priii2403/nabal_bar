// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChzHaChNL4xUPmxMaBmjTBI3LzMEtRxSw",
  authDomain: "nabal-bar.firebaseapp.com",
  databaseURL: "https://nabal-bar-default-rtdb.firebaseio.com",
  projectId: "nabal-bar",
  storageBucket: "nabal-bar.appspot.com",
  messagingSenderId: "916635049164",
  appId: "1:916635049164:web:30369c4562a0677e8fb669",
  measurementId: "G-4QBJDE9FJ7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const storage = getStorage();
export const auth = getAuth(app);
export const db = getDatabase(app);
export const fbdata = getFirestore(app);
export const database = getDatabase(app);
