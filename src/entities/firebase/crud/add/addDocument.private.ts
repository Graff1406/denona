import {
  doc,
  setDoc,
  addDoc,
  collection,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../app/public";
import { DocumentData } from "firebase/firestore/lite";

export default async <T extends DocumentData>(
  collectionName: string,
  docData: T,
  id?: string
): Promise<DocumentReference | void> => {
  return id
    ? await setDoc(doc(db, collectionName, id), docData)
    : await addDoc(collection(db, collectionName), docData);
};
