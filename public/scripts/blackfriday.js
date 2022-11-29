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

    document.getElementById("main").style.height = "auto";
    document.getElementById("main").style.minHeight = "80%";
    document.getElementById("main").style.background = "white";
  
    document.getElementById("final-funnel-step-title").innerHTML =
      "Welcome " + name + "!";
  
    let step3 = document
      .getElementById("funnel-step-three")
      .classList.remove("hidden");
}


let step1 = document
  .getElementById("country-form")
  .addEventListener("submit", handleCountryForm);

let step3 = document
  .getElementById("email-form")
  .addEventListener("submit", handleEmailForm);

function hideForm() {
  let form3 = (document.getElementById("email-form").style.display = "none");
}
