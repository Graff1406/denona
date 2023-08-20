import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config.private";

export const app = initializeApp(firebaseConfig);
