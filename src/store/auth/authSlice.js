import { createSlice } from "@reduxjs/toolkit";
import {
  checkingAuthentication,
  startCreatingUserWithEmail,
  startGoogleAuthentication,
  startLogOutFireBase,
  startLoginWithEmailAndPassword,
} from "./thunks";
import { authStates } from "./authSatates";

const initialState = {
  status: authStates.checking,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, { payload }) => {
      state.displayName = payload.displayName;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
      state.uid = payload.uid;
      state.status = authStates.authenticated;
    },
    logout: (state) => {
      state.displayName = initialState.displayName;
      state.email = initialState.email;
      state.photoURL = initialState.photoURL;
      state.uid = initialState.uid;
      state.status = authStates.notAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkingAuthentication.pending, (state) => {
      state.status = authStates.checking;
    }),
      //#region  startGoogleAuthentication
      builder.addCase(startGoogleAuthentication.pending, (state) => {
        state.status = authStates.checking;
        state.errorMessage = null;
      }),
      builder.addCase(startGoogleAuthentication.fulfilled, (state, action) => {
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.photoURL = action.payload.photoURL;
        state.uid = action.payload.uid;
        state.status = authStates.authenticated;
        state.errorMessage = null;
      }),
      builder.addCase(startGoogleAuthentication.rejected, (state, action) => {
        state.status = authStates.notAuthenticated;
        state.errorMessage = action.error.message;
      });
    //#endregion

    //#region startCreatingUserWithEmail
    builder.addCase(startCreatingUserWithEmail.pending, (state) => {
      state.status = authStates.checking;
      state.errorMessage = null;
    });

    builder.addCase(startCreatingUserWithEmail.fulfilled, (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.status = authStates.authenticated;
      state.errorMessage = null;
    });

    builder.addCase(startCreatingUserWithEmail.rejected, (state, action) => {
      state.status = authStates.notAuthenticated;
      state.errorMessage = action.error.message;
    });
    //#endregion

    //#region startLoginWithEmailAndPassword
    builder.addCase(startLoginWithEmailAndPassword.pending, (state) => {
      state.status = authStates.checking;
      state.errorMessage = null;
    });
    builder.addCase(
      startLoginWithEmailAndPassword.fulfilled,
      (state, action) => {
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.status = authStates.authenticated;
        state.errorMessage = null;
      }
    );
    builder.addCase(
      startLoginWithEmailAndPassword.rejected,
      (state, action) => {
        state.status = authStates.notAuthenticated;
        state.errorMessage = action.error.message;
      }
    );
    //#endregion startLogOutFireBase
    builder.addCase(startLogOutFireBase.fulfilled, (state) => {
      state.displayName = initialState.displayName;
      state.email = initialState.email;
      state.photoURL = initialState.photoURL;
      state.uid = initialState.uid;
      state.status = authStates.notAuthenticated;
    });
    //#region
  },
});
export const { login, logout, checkingCredentials } = authSlice.actions;
