// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUfRw1DZiSBuNDDRO-SziodNP78JJZl7M",
  authDomain: "aiapie.firebaseapp.com",
  projectId: "aiapie",
  storageBucket: "aiapie.appspot.com",
  messagingSenderId: "1061532191936",
  appId: "1:1061532191936:web:78980d3ec10c961bef3125",
  measurementId: "G-L7DPMESSRF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
