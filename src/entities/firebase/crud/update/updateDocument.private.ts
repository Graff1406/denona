import { doc, updateDoc } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";
import { db } from "../../app/public";

const update = async <T extends DocumentData>(
  collectionName: string,
  docID: string,
  docData: T
) => {
  await updateDoc(doc(db, collectionName, docID), docData);
};

export default update;
