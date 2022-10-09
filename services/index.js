import { addDoc, collection, Timestamp } from "firebase/firestore/lite";
import { firestore } from "firebaseConfig";

export const registerEmail = async ({ name, email }) => {
  try {
    const ref = collection(firestore, "aiapie-newletter");
    await addDoc(ref, {
      name,
      email,
      sentAt: Timestamp.now().toDate(),
    });
    return 0;
  } catch (err) {
    console.log(err);
    return -1;
  }
};
