import Dexie, { Table } from "dexie";
import { Translation } from "../firebase";
import { User } from "../models/index";

class DenonaDexie extends Dexie {
  translations!: Table<{ id?: number; items: Translation[] }>;
  user!: Table<{ id?: number; user: User }>;

  constructor() {
    super("denona");
    this.version(2).stores({
      translations: "++id",
      user: "++id",
    });
  }
}

export const indexDB = new DenonaDexie();
