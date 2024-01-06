import { configureStore } from "@reduxjs/toolkit";
import { startGoogleAuthentication, startLogOutFireBase } from "../../../src/store/auth/thunks";
import { logOutFireBase, singInWithGoogle } from "../../../src/firebase/providers";
import { authSlice } from "../../../src/store/auth/authSlice";
import { authStates } from "../../../src/store/auth/authSatates";

jest.mock("../../../src/firebase/providers");
describe("thunks", () => {
  let store;
  beforeAll(() => {
    store = configureStore({ reducer: authSlice.reducer });
    jest.clearAllMocks();
  });

  test("should login with startGoogleAuthentication ", async () => {
    const loginData = {
      ok: true,
      displayName: "test",
      email: "",
      photoURL: "",
      uid: "",
    };

    singInWithGoogle.mockImplementation(async () => loginData);
    await store.dispatch(startGoogleAuthentication());
    const { status, displayName } = store.getState();
    expect(status).toBe(authStates.authenticated);
    expect(displayName).toBe(loginData.displayName);
  });

  test("should logout", async () => {

    logOutFireBase.mockImplementation(async () => {});
    await store.dispatch(startLogOutFireBase());
    const { status } = store.getState();
    expect(status).toBe(authStates.notAuthenticated);
  });
});
