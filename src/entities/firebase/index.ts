export { app, db } from "./app/public";
export { signInGoogleWithPopup, authState, signOut } from "./auth/public";

export {
  addDocument,
  addDocumentToSubCollection,
  getDocumentById,
  getDocuments,
  getDocumentsByIds,
  getDocumentsFromSubCollection,
  getDocumentsFromSubCollectionByIds,
  updateDocument,
  updateSubCollectionDocument,
  deleteDocument,
  watchCollection,
  watchDocumentById,
  type Translation,
} from "./crud/public";
