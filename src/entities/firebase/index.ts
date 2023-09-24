export { app, db } from "./app/public";
export { signInGoogleWithPopup, authState, signOut } from "./auth/public";

export {
  addDocument,
  deleteDocument,
  watchCollection,
  type Translation,
  type Locales,
} from "./crud/public";