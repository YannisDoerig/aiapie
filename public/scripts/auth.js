const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal");
const authWrapper = document.querySelector(".auth");
const registerForm = document.querySelector(".register");
const loginForm = document.querySelector(".login");
const topRightUserButton = document.querySelector(".user-account");
const accountModal = document.querySelector(".account");
const accountModalSignoutButton = document.querySelector(
  ".account-modal-button-signout"
);
const accountModalCloseButton = document.querySelector(
  ".account-modal-button-close"
);
const accountUsername = document.querySelector(".username");
const accountEmail = document.querySelector(".email");
const accountMoreLessHighscore = document.querySelector(".more-less-highscore");
const accountMoreLessGames = document.querySelector(".more-less-games");
const accountYoutuberPick = document.querySelector(".user-youtuber-pick");
const accountRatherGames = document.querySelector(".rather-games");

// toggle auth modals
authSwitchLinks.forEach((link) => {
  link.addEventListener("click", () => {
    authModals.forEach((modal) => modal.classList.toggle("active"));
  });
});

// register form
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = registerForm.username.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  // firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     const createUserData = firebase
  //       .functions()
  //       .httpsCallable("newUserSignup");
  //     createUserData(username);
  //     registerForm.reset();
  //   })
  //   .catch((error) => {
  //     registerForm.querySelector(".error").textContent = error.message;
  //   });
});

// login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  // firebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     console.log("logged in", user);
  //     loginForm.reset();
  //   })
  //   .catch((error) => {
  //     loginForm.querySelector(".error").textContent = error.message;
  //   });
});

// button up right
topRightUserButton.addEventListener("click", () => {
  const user = firebase.auth().currentUser;
  if (user) {
    // click on "Account"
    accountModal.classList.add("open");

    setAccount(user);
    // Close if click outside of modal
    accountModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("account")) {
        accountModal.classList.remove("open");
      }
    });
  } else {
    // Click on Login
    authWrapper.classList.add("open");
    authModals[0].classList.add("active");

    authWrapper.addEventListener("click", (e) => {
      if (e.target.classList.contains("auth")) {
        authWrapper.classList.remove("open");
      }
    });
  }
});

// auth listener
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // signed in
//     authWrapper.classList.remove("open");
//     authModals.forEach((modal) => modal.classList.remove("active"));
//     topRightUserButton.textContent = "Wallet";
//   } else {
//     topRightUserButton.textContent = "Connect Wallet";
//     // authWrapper.classList.add("open");
//     // authModals[0].classList.add("active");
//   }
// });

// buttone su modal "account" -> Logout
// accountModalSignoutButton.addEventListener("click", () => {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => console.log("Signed out"));
//   accountModal.classList.remove("open");
// });

// buttone su modal "account" -> Close
accountModalCloseButton.addEventListener("click", () => {
  accountModal.classList.remove("open");
});

// const setAccount = async function (user) {
//   accountEmail.textContent = user.email;
//   const db = firebase.firestore();
//   const docRef = db.collection("users").doc(user.uid);
//   const userDoc = await docRef.get();
//   if (!userDoc.exists) {
//     console.log("No such document!");
//   } else {
//     accountUsername.textContent = userDoc.data()["username"];
//     accountMoreLessHighscore.textContent = `Highscore: ${
//       userDoc.data()["highscoreMoreLess"]
//     }`;
//     accountMoreLessGames.textContent = `Played Games: ${
//       userDoc.data()["gamesMoreOrLess"]
//     }`;
//     accountYoutuberPick.textContent = `Your Pick: ${
//       userDoc.data()["choosenYoutuber"]
//     }`;
//     accountRatherGames.textContent = `Played Games: ${
//       userDoc.data()["gamesRather"]
//     }`;
//   }
// };
