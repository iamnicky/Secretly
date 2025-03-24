import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export async function createEncryptedMessage(message, password) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      message: message,
      password: password,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getEncryptedMessage(uniqueId) {
  const docRef = doc(db, "messages", uniqueId.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
    return 123;
  }
}
