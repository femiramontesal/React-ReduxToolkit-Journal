import {
  loginWithEmailPassword,
  logoutFirebase,
  resgisterUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { user } from "../../interfaces/user";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication: any = (email: any, password: any) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn: any = () => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: user) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorCode, erroMessage } =
      await resgisterUserWithEmailPassword({
        email,
        password,
        displayName,
      });

    if (!ok) {
      console.log(erroMessage);
      return dispatch(logout(erroMessage));
    }

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }: any) => {
  return async (dispatch: any) => {
    dispatch(checkingCredentials());

    const { uid, photoURL, displayName, ok, erroMessage } =
      await loginWithEmailPassword({
        email,
        password,
      });

    if (!ok) {
      console.log(erroMessage);
      return dispatch(logout(erroMessage));
    }
    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLogout = () => {
  return async (dispatch: any) => {
    await logoutFirebase();
    dispatch(logout(undefined));
  };
};
