import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../app/public";
export default async (collectionName: string, docID: string) => {
  await deleteDoc(doc(db, collectionName, docID));
};
