import { useDispatch, useSelector } from "react-redux";
import { authStates } from "../store/auth/authSatates";
import { useEffect, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FireBaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { loadNotes } from "../store/journal";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const isChecking = useMemo(() => status == authStates.checking, [status]);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(FireBaseAuth, async (user) => {
      if (!user) {
        dispatch(logout());
        return;
      }
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
      dispatch(loadNotes())
    });
  }, [dispatch]);

  return isChecking;
};
