import { db } from "../../app/public";
import {
  collection,
  addDoc,
  doc,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";

interface AddDocumentToSubCollection<
  T extends WithFieldValue<DocumentData> | null
> {
  parentCollection: string;
  parentId: string;
  subCollection: string;
  data: T;
}

export default async function addDocumentToSubCollection<
  T extends WithFieldValue<DocumentData> | null
>({
  parentCollection,
  parentId,
  subCollection,
  data,
}: AddDocumentToSubCollection<T>): Promise<{ id: string } | null> {
  const parentDocRef = doc(db, parentCollection, parentId);
  const subCollectionRef = collection(parentDocRef, subCollection);

  if (data !== null) {
    const docRef = await addDoc(subCollectionRef, data);
    return { id: docRef.id };
  } else return null;
}
