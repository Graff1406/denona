import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../app/public";

interface DocumentQueryParams {
  collectionName: string;
  documentIds: string[];
}

const getDocumentsByIds = async ({
  collectionName,
  documentIds,
}: DocumentQueryParams): Promise<DocumentData[]> => {
  const q = query(
    collection(db, collectionName),
    where("__name__", "in", documentIds)
  );

  const snapshot = await getDocs(q);
  const documents: DocumentData[] = [];

  snapshot.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id });
  });

  return documents;
};

export default getDocumentsByIds;
