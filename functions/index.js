const functions = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

// http on Call 00 - save article
exports.saveArticle = functions.https.onCall((data, context) => {
  const articleData = {
    subdomain: data.subdomain,
    pageTitle: data.pageTitle,
    pageMetaDescription: data.pageMeta,
    pageHTML: data.pageHTML,
  };
  const articleID = `${data.subdomain}-${Math.floor(Math.random() * 1000)}`
  return db.collection("articles").doc(articleID).set(articleData)
      .then(() => {
        console.log("Set User Data Successfully!");
      }).catch((error) => {
        console.log("Error While setting user data in db:");
        console.log("Error: ", error);
      });
});

