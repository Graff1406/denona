export { app, db } from "./app/public";
export {
  signInGoogleWithPopup,
  authState,
  signOut,
  type AuthUser,
} from "./auth/public";

export {
  addDocument,
  deleteDocument,
  watchCollection,
  type Translation,
  type Locales,
} from "./crud/public";

export {
  getFCMToken,
  getMessagingByFCM,
  messaging,
  messagingSW,
} from "./FCM/public";
