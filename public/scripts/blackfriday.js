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
let allOffers = true;
let country = "";
let name = "";

function handleCountryForm(event) {
  event.preventDefault();
  country = document.getElementById("countries").value;
  if (country != undefined) {
    goToStepTwo();
  } else {
    console.log("one of the values was undefined");
  }
}

function handleEmailForm(event) {
  event.preventDefault();
  let newName = document.getElementById("newName").value;
  let newEmail = document.getElementById("newEmail").value;
  if (newName != undefined && newEmail != undefined) {
    hideForm();
    name = newName;
    submitRegistration(country, newName, newEmail);
    goToStepThree();
  } else {
    console.log("one of the values was undefined");
  }
}

function goToStepTwo() {
  let step1 = document
    .getElementById("funnel-step-one")
    .classList.add("hidden");

  document.getElementById("newsletter-title").innerHTML =
    "Free Access - Top Deals - " + country;

  let step2 = document
    .getElementById("funnel-step-two")
    .classList.remove("hidden");
}
function goToStepThree() {
  let step2 = document
    .getElementById("funnel-step-two")
    .classList.add("hidden");

  document.getElementById("final-funnel-step-title").innerHTML =
    "Welcome " + name + "!";

  let step3 = document
    .getElementById("funnel-step-three")
    .classList.remove("hidden");
}

const submitRegistration = async function (country, newName, newEmail) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firestore, "aiapie-blackfriday"), {
    name: newName,
    email: newEmail,
    country: country,
  });

  console.log("Document written with ID: ", docRef.id);
};

let step1 = document
  .getElementById("country-form")
  .addEventListener("submit", handleCountryForm);

let step3 = document
  .getElementById("email-form")
  .addEventListener("submit", handleEmailForm);

function hideForm() {
  let form3 = (document.getElementById("email-form").style.display = "none");

  document.getElementById("newsletter-title").innerHTML =
    "You Registered Successfully!";
  document.getElementById("newsletter-description").innerHTML =
    "Soon you will get your first Black Friday Offers in your email inbox.";
}
