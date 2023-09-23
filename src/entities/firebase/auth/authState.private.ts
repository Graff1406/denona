import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./auth.private";
import { type User as AuthUser } from "../../models/index";

export const authState = (callback: (user: AuthUser | null) => void) => {
  const observer = async (user: User | null) => {
    try {
      if (user && user?.getIdToken) {
        const {
          uid,
          displayName,
          email,
          emailVerified,
          photoURL,
          phoneNumber,
        } = user;
        const accessToken = await user.getIdToken();
        callback({
          accessToken,
          uid,
          displayName,
          email,
          emailVerified,
          photoURL,
          phoneNumber,
        });
      } else {
        callback(null);
      }
    } catch (error) {
      callback(null);
    }
  };
  onAuthStateChanged(auth, observer);
};
