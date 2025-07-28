import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
