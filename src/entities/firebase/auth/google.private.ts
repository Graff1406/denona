import {
  signInWithPopup,
  useDeviceLanguage,
  UserCredential,
} from "firebase/auth";
import { provider, auth } from "./auth.private";

export const signInGoogleWithPopup = async (): Promise<UserCredential> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useDeviceLanguage(auth);
  const user = await signInWithPopup(auth, provider);
  return user;
};
