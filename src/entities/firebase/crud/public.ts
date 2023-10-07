export { default as addDocument } from "./add/addDocument.private";
export { default as updateDocument } from "./update/updateDocument.private";
export { default as deleteDocument } from "./delete/deleteDocument.private";

// Read

export { default as getDocumentById } from "./read/getDocumentById.private";
export { default as watchDocumentById } from "./read/watchDocumentById.private";
export {
  default as watchCollection,
  type Translation,
} from "./read/watchCollection.private";
