import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../app/public";

export default async (
  collectionName: string,
  docData: { [key: string]: string },
  id?: string
): Promise<void> => {
  id
    ? await setDoc(doc(db, collectionName, id), docData)
    : await addDoc(collection(db, collectionName), docData);
};
