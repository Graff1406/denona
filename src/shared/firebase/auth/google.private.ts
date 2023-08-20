import { signInWithPopup, useDeviceLanguage } from "firebase/auth";
import { provider, auth } from "./auth.private";

export const signInGoogleWithPopup = async (): Promise<void> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useDeviceLanguage(auth);
  await signInWithPopup(auth, provider);
};
