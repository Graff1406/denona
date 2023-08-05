import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import Router from "./router";

function App() {
  return (
    <HelmetProvider>
      <StrictMode>
        <Router />
      </StrictMode>
    </HelmetProvider>
  );
}

export default App;
