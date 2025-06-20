// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4aseiixM3fSW8HtyL5orS7Xw_8tnDXB0",
  authDomain: "ucabvocacional.firebaseapp.com",
  projectId: "ucabvocacional",
  storageBucket: "ucabvocacional.firebasestorage.app",
  messagingSenderId: "134050077073",
  appId: "1:134050077073:web:a9b25c3bf365f2cbdee230",
  measurementId: "G-DH28JWBMTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
