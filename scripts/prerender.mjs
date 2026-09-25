/* Menyisipkan markup hasil render server ke dist/index.html supaya crawler
 * dan pengunjung tanpa JS tetap menerima HTML lengkap (semantic HTML, heading,
 * alt text). Halaman tetap dihidrasi di browser. */
import { readFileSync, writeFileSync } from "node:fs";

const { render } = await import("../dist-ssr/entry-server.js");

const target = "dist/index.html";
const template = readFileSync(target, "utf8");
const markup = render();
const placeholder = '<div id="root"></div>';

if (!template.includes(placeholder)) {
  console.error(`Placeholder ${placeholder} tidak ditemukan di ${target}.`);
  process.exit(1);
}

writeFileSync(target, template.replace(placeholder, `<div id="root">${markup}</div>`));
console.log(`✓ prerender: ${(markup.length / 1024).toFixed(1)} KB markup disisipkan ke ${target}`);
