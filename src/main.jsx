import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { readTheme, applyTheme } from "./utils/theme";

// Apply the saved (or OS-preferred) theme before the first paint so there is
// no light/dark flash on load.
applyTheme(readTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
