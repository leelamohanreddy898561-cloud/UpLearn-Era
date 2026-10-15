import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { readTheme, applyTheme } from "./utils/theme";

// Apply the saved (or OS-preferred) theme before the first paint.
applyTheme(readTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Register the service worker so the site is installable as a PWA.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // registration is best-effort — the app works fine without it
    });
  });
}
