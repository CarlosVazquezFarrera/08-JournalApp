import { authSlice, login, logout } from "../../../src/store/auth";
import { authStates } from "../../../src/store/auth/authSatates";
import { demoUser, initialState } from "../../fixtures/authFixture";

describe("authSlice", () => {
  test("should return initial state and excuted auth", () => {
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should login", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: authStates.authenticated,
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("should logout", () => {
    const state = authSlice.reducer(initialState, logout());
    expect(state).toEqual({
      status: authStates.notAuthenticated,
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null,
    });
  });
});
