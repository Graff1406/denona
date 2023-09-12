import Dexie, { Table } from "dexie";
import { Translation } from "../firebase";

export class TransactionsDexie extends Dexie {
  translations!: Table<{ id?: number; items: Translation[] }>;

  constructor() {
    super("denona");
    this.version(1).stores({
      translations: "++id",
    });
  }
}

export const indexDB = new TransactionsDexie();
