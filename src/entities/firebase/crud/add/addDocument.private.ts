import {
  doc,
  setDoc,
  addDoc,
  collection,
  DocumentReference,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../app/public";
import { DocumentData } from "firebase/firestore/lite";

export default async <T extends DocumentData>(
  collectionName: string,
  docData: T,
  id?: string
): Promise<DocumentReference | void> => {
  const data = { ...docData, created: serverTimestamp() };
  return id
    ? await setDoc(doc(db, collectionName, id), data)
    : await addDoc(collection(db, collectionName), data);
};
