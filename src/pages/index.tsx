// Imports
import { Suspense, lazy, FC } from "react";
import loadingSvg from "/assets/owl_spinner.svg";

// Shared

import { DeImage } from "@/shared/ui";

const S = lazy(() => import("./Settings.private"));
const H = lazy(() => import("./help/Help.private"));
const AH = lazy(() => import("./home/AuthorizedHome.private"));
const CR = lazy(() => import("./CreateTask.private"));
const LS = lazy(() => import("./LifeSphere.private"));
const GL = lazy(() => import("./Goal.private"));

// Exports

export { default as Home } from "./home/Home.private";
export const AuthorizedHome = () => SetSuspense(AH);
export const Settings = () => SetSuspense(S);
export const Help = () => SetSuspense(H);
export const CreateTask = () => SetSuspense(CR);
export const LifeSphere = () => SetSuspense(LS);
export const Goal = () => SetSuspense(GL);

function SetSuspense(C: FC) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <DeImage
            lazy={false}
            src={loadingSvg}
            alt="Loading..."
            className="animate-ping w-10 h-10"
          />
        </div>
      }
    >
      <C />
    </Suspense>
  );
}
