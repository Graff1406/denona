import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "../app/public";

export const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
