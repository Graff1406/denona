import { signOut as LogOut } from "firebase/auth";
import { auth } from "./auth.private.ts";

export const signOut = async () => {
  try {
    await LogOut(auth);
    return true;
  } catch (error) {
    console.log(error);
  }
};
