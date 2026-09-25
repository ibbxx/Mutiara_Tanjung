import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/styles.css";

const container = document.getElementById("root");

/* Markup sudah diprerender saat build (lihat scripts/prerender.mjs), jadi
 * cukup dihidrasi. Kalau container kosong (mis. mode development), render biasa. */
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
