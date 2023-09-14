// Imports
import { Suspense, lazy } from "react";
import loadingSvg from "/assets/owl_spinner.svg";
const S = lazy(() => import("./Settings"));

const SetSuspense = (C: any) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <img
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

export { default as Home } from "./Home";
export const Settings = SetSuspense(S);
