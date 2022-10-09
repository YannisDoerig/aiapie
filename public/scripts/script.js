// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
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
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function handleForm(event) {
  event.preventDefault();
  let newName = document.getElementById("newName").value;
  let newEmail = document.getElementById("newEmail").value;
  if (newName != undefined && newEmail != undefined) {
    submitRegistration(newName, newEmail);
    hideForm();
  } else {
    console.log("one of the values was undefined");
  }
}

const submitRegistration = async function (newName, newEmail) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firestore, "aiapie-newsletter"), {
    name: newName,
    email: newEmail,
  });
  console.log("Document written with ID: ", docRef.id);
};

const form = document
  .getElementById("email-form")
  .addEventListener("submit", handleForm);

function hideForm() {
  document.getElementById("email-form").style.display("none");
  document
    .getElementsByClassName("registered-successfully")
    .style.display("true");
}
