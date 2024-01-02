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
  return newData;
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
  return { id: idNote, ...note };
};

export const uploadFile = async (file) => {
  if (!file) throw new Error("File is required");

  const urlCloudy = "https://api.cloudinary.com/v1_1/dwigzmt2h/image/upload";

  const formData = new FormData();
  formData.append("upload_preset", "journal");
  formData.append("file", file);

  const res = await fetch(urlCloudy, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Uplod failed");
  const cloudResp = await res.json();
  return cloudResp.secure_url;
};
