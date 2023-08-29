import { app } from "../app/public";
import { getMessaging } from "firebase/messaging";
import { getMessaging as getMessagingSW } from "firebase/messaging/sw";

export const messaging = getMessaging(app);
export const messagingSW = getMessagingSW(app);
