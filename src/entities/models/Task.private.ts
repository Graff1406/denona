import { Timestamp } from "firebase/firestore";

export type Task = {
  duration: { date: Date | Timestamp; start: string; end: string };
};
