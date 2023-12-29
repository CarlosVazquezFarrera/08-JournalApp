import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FireBaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  const result = await signInWithPopup(FireBaseAuth, googleProvider);
  //const credentials = GoogleAuthProvider.credentialFromResult(result);
  const { displayName, email, photoURL, uid } = result.user;
  return {
    ok: true,
    displayName,
    email,
    photoURL,
    uid,
  };
};

export const signInWithEmail = async ({ email, password, displayName }) => {
  const result = await createUserWithEmailAndPassword(
    FireBaseAuth,
    email,
    password
  );
  await updateProfile(FireBaseAuth.currentUser, {displayName});
  const { uid } = result.user;
  return {
    ok: true,
    displayName,
    email,
    uid,
  };
};

export const loginWithEmail = async({email, password}) => {
  const result = await signInWithEmailAndPassword(FireBaseAuth, email, password);
  const {displayName, uid} = result.user;
  return {
    ok: true,
    displayName,
    email,
    uid,
  };
}

export const logOutFireBase = async()=>{
  return await FireBaseAuth.signOut();
};
