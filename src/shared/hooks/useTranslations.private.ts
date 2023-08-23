import { useContext } from "react";

// App

import { TranslationsContext } from "@/app/contexts";

export default () => {
  const context = useContext(TranslationsContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
