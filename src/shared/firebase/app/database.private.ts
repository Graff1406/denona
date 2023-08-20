import { getFirestore } from "firebase/firestore";
import { app } from "./app.private";

export const db = getFirestore(app);
