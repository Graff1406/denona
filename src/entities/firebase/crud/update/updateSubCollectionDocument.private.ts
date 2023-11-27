import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../app/public";

interface UpdateSubcollectionDocumentParams {
  parentCollection: string;
  parentId: string;
  subcollection: string;
  documentId: string;
  data: Record<string, any>;
}

const updateSubcollectionDocument = async ({
  parentCollection,
  parentId,
  subcollection,
  documentId,
  data,
}: UpdateSubcollectionDocumentParams): Promise<void> => {
  const parentDocRef = doc(
    db,
    parentCollection,
    parentId,
    subcollection,
    documentId
  );

  try {
    await updateDoc(parentDocRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

export default updateSubcollectionDocument;
