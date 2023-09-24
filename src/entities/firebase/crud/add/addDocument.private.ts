import {
  doc,
  setDoc,
  addDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../app/public";

export default async (
  collectionName: string,
  docData: {
    [key: string]: string | undefined | { [key: string]: string | undefined };
  },
  id?: string
): Promise<DocumentReference | void> => {
  return id
    ? await setDoc(doc(db, collectionName, id), docData)
    : await addDoc(collection(db, collectionName), docData);
};