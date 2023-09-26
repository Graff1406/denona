import { User } from "../models";
import { indexDB } from "./index";

export const getUserFromIndexDB = async (): Promise<User | null> => {
  const db = await indexDB.user.get({ id: 1 });
  return db?.user || null;
};

export const addUserFromIndexDB = async (user: User): Promise<void> => {
  await indexDB.user.add({ id: 1, user });
};
