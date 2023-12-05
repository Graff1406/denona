import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../app/public";

interface SubcollectionArrayQueryParams<T> {
  parentCollection: string;
  parentId: string;
  subcollection: string;
  field?: string;
  documentIds: string[];
  converter?: FirestoreDataConverter<T>;
}

const getDocumentsFromSubCollectionByIds = async <T>({
  parentCollection,
  parentId,
  subcollection,
  field = "__name__",
  documentIds,
  converter,
}: SubcollectionArrayQueryParams<T>): Promise<T[]> => {
  const subcollectionRef = collection(
    db,
    parentCollection,
    parentId,
    subcollection
  );

  const q = query(subcollectionRef, where(field, "in", documentIds));

  const querySnapshot = await getDocs(q);

  const documents: T[] = [];
  querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const data = doc.data();
    if (data) {
      const id = doc.id;
      const convertedDoc = converter ? converter.fromFirestore(doc, {}) : data;
      documents.push({ ...convertedDoc, id } as T);
    }
  });

  return documents;
};

export default getDocumentsFromSubCollectionByIds;
