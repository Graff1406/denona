import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  FirestoreDataConverter,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../app/public";

interface SubcollectionQueryParams<T> {
  parentCollection: string;
  parentId: string;
  subcollection: string;
  field?: string;
  value: unknown;
  converter?: FirestoreDataConverter<T>;
}

const getDocumentsFromSubCollection = async <T>({
  parentCollection,
  parentId,
  subcollection,
  field = "__name__",
  value,
  converter,
}: SubcollectionQueryParams<T>): Promise<T[]> => {
  const subcollectionRef = collection(
    db,
    parentCollection,
    parentId,
    subcollection
  );
  const q = query(subcollectionRef, where(field, "==", value));

  const querySnapshot = await getDocs(q);

  const documents: T[] = [];
  querySnapshot.forEach((doc: DocumentSnapshot<DocumentData>) => {
    if (doc.exists()) {
      const data = doc.data();
      const id = doc.id;
      const convertedDoc = converter ? converter.fromFirestore(doc, {}) : data;
      documents.push({ ...convertedDoc, id } as T);
    }
  });

  return documents;
};

export default getDocumentsFromSubCollection;
