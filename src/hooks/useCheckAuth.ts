import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useCheckAuth = () => {
  const { status, displayName } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user: any) => {
      if (!user) return dispatch(logout(undefined));
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  return {
    status, displayName
  };

};
