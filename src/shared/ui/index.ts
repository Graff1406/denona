import { lazy } from "react";
// export { DnButton, DnIconButton } from "./buttons/public";
// export { default as DeMenu } from "./DeMenu.private";
// export { default as DeExpand } from "./DeExpand.private";
// export { default as DeSwitch } from "./DeSwitch.private";

export const DnButton = lazy(() => import("./buttons/Btn.private"));
export const DnIconButton = lazy(() => import("./buttons/IconBtn.private"));
export const DeMenu = lazy(() => import("./DeMenu.private"));
export const DeExpand = lazy(() => import("./DeExpand.private"));
export const DeSwitch = lazy(() => import("./DeSwitch.private"));
export const DeRadio = lazy(() => import("./DeRadio.private"));
