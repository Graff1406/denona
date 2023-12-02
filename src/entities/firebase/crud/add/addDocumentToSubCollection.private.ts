import { db } from "../../app/public";
import {
  collection,
  addDoc,
  doc,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";

interface AddDocumentToSubCollection<T extends WithFieldValue<DocumentData>> {
  parentCollection: string;
  parentId: string;
  subCollection: string;
  data: T;
}

export default async function addDocumentToSubCollection<
  T extends WithFieldValue<DocumentData>
>({
  parentCollection,
  parentId,
  subCollection,
  data,
}: AddDocumentToSubCollection<T>): Promise<void> {
  const parentDocRef = doc(db, parentCollection, parentId);
  const subCollectionRef = collection(parentDocRef, subCollection);

  await addDoc(subCollectionRef, data);
}
