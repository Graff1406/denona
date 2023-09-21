import { lazy } from "react";

export { default as DeImage } from "./DeImage.private";

export const DnButton = lazy(() => import("./buttons/Btn.private"));
export const DnIconButton = lazy(() => import("./buttons/IconBtn.private"));
export const DeMenu = lazy(() => import("./DeMenu.private"));
export const DeExpand = lazy(() => import("./DeExpand.private"));
export const DeSwitch = lazy(() => import("./DeSwitch.private"));
export const DeRadio = lazy(() => import("./DeRadio.private"));
