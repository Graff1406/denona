import { Timestamp } from "firebase/firestore";

export default (timestamp: Timestamp): Date => {
  return timestamp.toDate();
};
