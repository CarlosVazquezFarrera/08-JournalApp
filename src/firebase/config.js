import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDuNPFdwLBJt_gmgGNsmbQEbWz-ZaXmo94",
  authDomain: "react-curso-e1a1b.firebaseapp.com",
  projectId: "react-curso-e1a1b",
  storageBucket: "react-curso-e1a1b.appspot.com",
  messagingSenderId: "1072858117401",
  appId: "1:1072858117401:web:6e58491a4a2264e596c188",
};

export const FireBaseApp = initializeApp(firebaseConfig);

export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);
