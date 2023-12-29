import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "./config";

export const firebaseCreateNote = async (uid) => {
  const newNote = {
    title: "",
    body: "",
    date: new Date().getTime(),
  };

  const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));
  const newData = await setDoc(newDoc, newNote);
  console.log(newData);
  return newNote;
};

export const fireBaseLoadNotes = async (uid) => {
  const collectionRef = collection(FireBaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes = [];
  docs.forEach(doc => {
    notes.push({id: doc.id, ...doc.data() })
  });
  console.log(notes)
  return notes;
};
