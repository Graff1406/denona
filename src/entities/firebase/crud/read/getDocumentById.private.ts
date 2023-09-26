import { doc, getDoc } from "firebase/firestore";
import { db } from "../../app/public";
import { User } from "../../../models/index";
export default async (
  collectionName: string,
  docID: string
): Promise<User | null> => {
  const docSnap = await getDoc(doc(db, collectionName, docID));
  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    return null;
  }
};
