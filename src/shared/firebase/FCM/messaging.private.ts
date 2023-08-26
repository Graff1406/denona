import { app } from "../app/public";
import { getMessaging } from "firebase/messaging";

export const messaging = getMessaging(app);
