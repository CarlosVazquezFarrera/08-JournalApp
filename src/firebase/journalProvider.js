import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "./config";

export const firebaseCreateNote = async (uid) => {
  const newNote = {
    title: "",
    body: "",
    date: new Date().getTime(),
  };

  const newDoc = doc(collection(FireBaseDB, `${uid}/journal/notes`));
  await setDoc(newDoc, newNote);
  newNote.id = newDoc.id
  return newNote;
};

export const fireBaseLoadNotes = async (uid) => {
  const collectionRef = collection(FireBaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  return notes;
};

export const fireBaseSaveNote = async (uid, idNote, note) => {
  const docRef = doc(FireBaseDB, `${uid}/journal/notes/${idNote}`);
  await setDoc(docRef, note, { merge: true });
  console.log(x)
  return { id: idNote, ...note };
};


export const fireBaseDeleteNote = async (uid, note)=>{
  const docRef = doc(FireBaseDB, `${uid}/journal/notes/${note.id}`);
  await deleteDoc(docRef);
  return note;
}
