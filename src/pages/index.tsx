// Imports
import { Suspense, lazy, FC } from "react";
import loadingSvg from "/assets/owl_spinner.svg";

// Shared

import { DeImage } from "@/shared/ui";

const S = lazy(() => import("./Settings.private"));
const AH = lazy(() => import("./home/AuthorizedHome.private"));

// Exports

export { default as Home } from "./home/Home.private";
export const AuthorizedHome = () => SetSuspense(AH);
export const Settings = () => SetSuspense(S);

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
