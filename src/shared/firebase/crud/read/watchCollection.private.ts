import {
  collection,
  onSnapshot,
  type DocumentSnapshot,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";

import { db } from "../../app/public";

export type Locales = "en" | "de" | "ka" | "ua" | "ru";

export type Translation = {
  id: string;
  en: string;
  de?: string;
  ka?: string;
  ua?: string;
  ru?: string;
};

export default (
  collectionName: string,
  callback: (result: Translation[]) => void
): Unsubscribe => {
  // Firebase watcher on translation collection

  const unsubscribe: Unsubscribe = onSnapshot(
    collection(db, collectionName),
    (querySnapshot) => {
      const items: Translation[] = [];
      querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
        const item = { id: doc.id, ...doc.data() } as Translation;
        items.push(item);
      });
      callback(items);
    }
  );

  return unsubscribe;
};
