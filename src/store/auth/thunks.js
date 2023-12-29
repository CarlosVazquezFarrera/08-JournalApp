import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  logOutFireBase,
  loginWithEmail,
  signInWithEmail,
  singInWithGoogle,
} from "../../firebase/providers";

export const checkingAuthentication = createAsyncThunk(
  "user/checkingAuthentication",
  async ({ email, password }) => {
    console.log(email);
    console.log(password);
    //   const response = await userAPI.fetchById(userId)
    //   return response.data
  }
);

export const startGoogleAuthentication = createAsyncThunk(
  "user/startGoogleAuthentication",
  async () => {
    const result = await singInWithGoogle();
    return result;
  }
);

export const startCreatingUserWithEmail = createAsyncThunk(
  "user/startCreatingUserWithEmail",
  async ({ email, password, displayName }) => {
    const result = await signInWithEmail({ email, password, displayName });
    return result;
  }
);

export const startLoginWithEmailAndPassword = createAsyncThunk(
  "user/startLoginWithEmailAndPassword",
  async ({ email, password }) => {
    const result = await loginWithEmail({ email, password });
    return result;
  }
);

export const startLogOutFireBase = createAsyncThunk(
  "user/startLogOutFireBase",
  async () => {
    await logOutFireBase();
  }
);
