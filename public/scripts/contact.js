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
  let newMessage = document.getElementById("newMessage").value;
  if (
    newName != undefined &&
    newEmail != undefined &&
    newMessage != undefined
  ) {
    hideForm();
    submitRegistration(newName, newEmail, newMessage);
  } else {
    console.log("one of the values was undefined");
  }
}

const submitRegistration = async function (newName, newEmail, newMessage) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firestore, "aiapie-contact"), {
    name: newName,
    email: newEmail,
    message: newMessage,
  });
  console.log("Document written with ID: ", docRef.id);
};

let form = document
  .getElementById("contact-form")
  .addEventListener("submit", handleForm);

function hideForm() {
  let form = (document.getElementById("contact-form").style.display = "none");
  document.getElementById("intro-title").innerHTML =
    "Message Sent Successfully!";
  document.getElementById("intro-text").innerHTML =
    "We will get back to you in the next 24 hours.";
}
