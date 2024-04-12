// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChzHaChNL4xUPmxMaBmjTBI3LzMEtRxSw",
  authDomain: "nabal-bar.firebaseapp.com",
  projectId: "nabal-bar",
  storageBucket: "nabal-bar.appspot.com",
  messagingSenderId: "916635049164",
  appId: "1:916635049164:web:83cc8209fc8566938fb669",
  measurementId: "G-B6789V6FX8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const auth = getAuth(app);
export const db = getDatabase(app);