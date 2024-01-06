import { authStates } from "../../src/store/auth/authSatates";

export const initialState = {
  status: authStates.checking,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: authStates.authenticated,
  uid: "12323123",
  email: "test@hmail.com",
  displayName: "test",
  photoURL: "https://test.png",
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: authStates.notAuthenticated,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const demoUser = {
  uid: "12323123",
  email: "test@hmail.com",
  displayName: "test",
  photoURL: "https://test.png",
};
