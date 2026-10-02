import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Fontes hospedadas no próprio site: mais rápido e sem chamada externa ao Google (LGPD agradece).
import "@fontsource-variable/manrope";
import "@fontsource/newsreader/latin-400-italic.css";
import "@fontsource/newsreader/latin-ext-400-italic.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
