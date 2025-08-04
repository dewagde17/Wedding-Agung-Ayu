// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPSY-aK7kMknvEajlWUdLyCbnFEvsO1UM",
  authDomain: "wedding-e4182.firebaseapp.com",
  projectId: "wedding-e4182",
  storageBucket: "wedding-e4182.firebasestorage.app",
  messagingSenderId: "969746629873",
  appId: "1:969746629873:web:2351e38ac113d0261cd550",
  measurementId: "G-LKZW1M0XR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };