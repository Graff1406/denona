import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../app/public";

interface DocumentQueryParams<T> {
  collectionName: string;
  documentIds: string[];
  transform?: (data: DocumentData) => T;
}

const getDocumentsByIds = async <T>({
  collectionName,
  documentIds,
  transform,
}: DocumentQueryParams<T>): Promise<T[]> => {
  const q = query(
    collection(db, collectionName),
    where("__name__", "in", documentIds)
  );

  const snapshot = await getDocs(q);
  const documents: T[] = [];

  snapshot.forEach((doc) => {
    const transformedData = transform
      ? transform(doc.data())
      : (doc.data() as T);
    documents.push({ ...transformedData, id: doc.id });
  });

  return documents;
};

export default getDocumentsByIds;
