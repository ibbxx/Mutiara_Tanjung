import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/** Dipakai scripts/prerender.mjs saat build — bukan bagian dari bundle browser. */
export function render() {
  return renderToString(<App />);
}
