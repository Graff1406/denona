import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../app/public";

const watch = <T>(
  collectionName: string,
  docId: string,
  callback: (data: T | null) => void
) => {
  return onSnapshot(doc(db, collectionName, docId), (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as T;
      callback(data);
    } else {
      callback(null);
    }
  });
};

export default watch;
