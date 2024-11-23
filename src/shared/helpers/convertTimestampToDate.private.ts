import { Timestamp } from "firebase/firestore";

export default (timestamp: Timestamp | Date): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate(); // If it's a Timestamp, use toDate()
  } else if (timestamp instanceof Date) {
    return timestamp; // If it's already a Date, return it as is
  } else {
    throw new Error("Invalid timestamp type"); // Handle other cases or throw an error
  }
};
