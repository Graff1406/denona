// Imports
import { Suspense, lazy } from "react";
import loadingSvg from "/assets/owl_spinner.svg";

// Shared

import { DeImage } from "@/shared/ui";

const S = lazy(() => import("./Settings"));

const SetSuspense = (C: any) => {
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
};

// Exports

export { default as Home } from "./home/Home";
export { default as AuthorizedHome } from "./home/AuthorizedHome";
export const Settings = () => SetSuspense(S);
