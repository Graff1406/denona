import {
  collection,
  query,
  limit,
  orderBy,
  getDocs,
  startAfter,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../app/public";
import { Sphere } from "@/entities/models";

interface GetDocument {
  collectionName: string;
  isLimit?: number;
  order?: "desc" | "asc";
  orderField?: "created" | "id";
  lastDocument?: Sphere;
}

const getDocuments = async ({
  collectionName,
  isLimit = 10,
  order = "asc",
  orderField = "created",
  lastDocument,
}: GetDocument): Promise<{ list: Sphere[]; size: number }> => {
  const baseQuery = query(
    collection(db, collectionName),
    orderBy(orderField, order),
    limit(isLimit)
  );
  const q = lastDocument
    ? query(baseQuery, startAfter(lastDocument[orderField]))
    : baseQuery;

  const list: Sphere[] = [];
  const res = await getDocs(q);

  if (!res.empty) {
    res.forEach((doc) => {
      const data = doc.data() as DocumentData;
      list.push({ ...data, id: doc.id } as Sphere);
    });
  }

  return { list, size: res.size };
};

export default getDocuments;
