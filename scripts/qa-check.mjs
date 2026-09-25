/* QA responsif: overflow, tap target, affordance pecah, kontras, dan
 * interaksi menu. Dijalankan terhadap hasil build.
 *
 *   npm run qa            → build + jalankan semua pemeriksaan
 *   CHROME_PATH=... npm run qa   → kalau Chrome tidak terdeteksi otomatis
 *
 * Skrip ini menyalakan `vite preview` sendiri bila belum ada server. */
import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";

const CHROME = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean).find((path) => existsSync(path));

if (!CHROME) {
  console.error("Chrome/Chromium tidak ditemukan. Set CHROME_PATH ke file binary-nya.");
  process.exit(1);
}

const PORT = Number(process.env.QA_PORT || 4173);
const URL = process.env.QA_URL || `http://localhost:${PORT}/`;
const WIDTHS = [320, 360, 375, 390, 412, 430, 768, 1024, 1280, 1440, 1920];

mkdirSync("qa-shots", { recursive: true });

const up = async () => {
  try {
    return (await fetch(URL)).ok;
  } catch {
    return false;
  }
};

let server = null;
if (!(await up())) {
  server = spawn("npx", ["vite", "preview", "--port", String(PORT)], { stdio: "ignore" });
  for (let i = 0; i < 40 && !(await up()); i += 1) {
    await new Promise((r) => setTimeout(r, 250));
  }
  if (!(await up())) {
    console.error(`vite preview gagal jalan di ${URL} — jalankan \`npm run build\` dulu.`);
    process.exit(1);
  }
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(String(e)));

let failures = 0;

const measure = () =>
  page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const canvas = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    const toRgb = (color) => {
      canvas.clearRect(0, 0, 1, 1);
      canvas.fillStyle = "#000";
      canvas.fillStyle = color;
      canvas.fillRect(0, 0, 1, 1);
      const d = canvas.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2], d[3] / 255];
    };
    const lum = ([r, g, b]) => {
      const f = (v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const bgOf = (el) => {
      let n = el;
      while (n && n !== document.documentElement) {
        const cs = getComputedStyle(n);
        const c = toRgb(cs.backgroundColor);
        if (c[3] > 0.95) return c;
        n = n.parentElement;
      }
      return [255, 255, 255, 1];
    };
    const ratio = (a, b) => {
      const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (l1 + 0.05) / (l2 + 0.05);
    };

    const overflowing = [];
    const wrapped = [];
    const smallTargets = [];
    const brokenImages = [];
    const contrast = [];

    const inScroller = (el) => {
      let n = el.parentElement;
      while (n && n !== document.body) {
        const s = getComputedStyle(n);
        if (s.overflowX === "auto" || s.overflowX === "scroll") return true;
        n = n.parentElement;
      }
      return false;
    };

    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (cs.position === "fixed") continue;

      if (!inScroller(el) && (rect.right > vw + 1.5 || rect.left < -1.5)) {
        overflowing.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 40),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }

      if (el.tagName === "IMG" && el.naturalWidth === 0) {
        brokenImages.push(el.getAttribute("src"));
      }

      if (el.matches("a[href], button")) {
        if (rect.height < 43.5) {
          smallTargets.push({
            cls: el.className?.toString().slice(0, 36),
            text: (el.textContent || "").trim().slice(0, 24),
            h: Math.round(rect.height),
          });
        }
        const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
        const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
        if (cs.whiteSpace === "nowrap" && rect.height - pad > lh * 1.8) {
          wrapped.push({
            cls: el.className?.toString().slice(0, 36),
            text: (el.textContent || "").trim().slice(0, 24),
            h: Math.round(rect.height),
          });
        }
      }

      /* Kontras untuk teks yang benar-benar punya isi. */
      const direct = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 1
      );
      const fs = parseFloat(cs.fontSize);
      if (direct && fs >= 15 && el.children.length === 0) {
        const fg = toRgb(cs.color);
        const bg = bgOf(el);
        const r = ratio(fg.slice(0, 3), bg);
        const large = fs >= 24 || (fs >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
        const need = large ? 3 : 4.5;
        if (r < need) {
          contrast.push({
            cls: el.className?.toString().slice(0, 32),
            text: el.textContent.trim().slice(0, 26),
            fs: Math.round(fs),
            ratio: r.toFixed(2),
            need,
          });
        }
      }
    }

    const h1 = document.querySelector("h1");
    const h1cs = h1 ? getComputedStyle(h1) : null;
    return {
      vw,
      docOverflow: document.documentElement.scrollWidth - vw,
      bodyOverflow: document.body.scrollWidth - vw,
      overflowing,
      wrapped,
      smallTargets,
      brokenImages,
      contrast,
      h1Size: h1cs?.fontSize ?? null,
      h1Lines: h1
        ? Math.round(h1.getBoundingClientRect().height / (parseFloat(h1cs.lineHeight) || 1))
        : null,
      railVisible: getComputedStyle(document.querySelector(".nav__rail")).display !== "none",
      toggleVisible: getComputedStyle(document.querySelector(".nav__toggle")).display !== "none",
      stickyVisible: getComputedStyle(document.querySelector(".sticky-cta")).display !== "none",
      productCols: getComputedStyle(document.querySelector(".product-grid")).gridTemplateColumns.split(" ").length,
      fontsReady:
        document.fonts.check('16px Fraunces') && document.fonts.check('16px "IBM Plex Sans"'),
    };
  });

for (const width of WIDTHS) {
  await page.setViewport({ width, height: 780, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle2" });

  /* gulir ke bawah untuk memicu reveal + paksa semua gambar dimuat supaya
   * pengecekan gambar rusak benar-benar menguji seluruh aset */
  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = "eager";
    });
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  await page.waitForFunction(
    () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
    { timeout: 8000 }
  ).catch(() => {});

  const r = await measure();
  const problems = [];
  if (r.docOverflow > 0) problems.push(`doc overflow +${r.docOverflow}px`);
  if (r.bodyOverflow > 0) problems.push(`body overflow +${r.bodyOverflow}px`);
  if (r.overflowing.length) problems.push(`keluar viewport: ${JSON.stringify(r.overflowing.slice(0, 4))}`);
  if (r.wrapped.length) problems.push(`affordance 2 baris: ${JSON.stringify(r.wrapped.slice(0, 3))}`);
  if (r.smallTargets.length) problems.push(`tap <44px: ${JSON.stringify(r.smallTargets.slice(0, 4))}`);
  if (r.brokenImages.length) problems.push(`img gagal: ${r.brokenImages.join(",")}`);
  if (r.contrast.length) problems.push(`kontras kurang: ${JSON.stringify(r.contrast.slice(0, 5))}`);
  if (!r.fontsReady) problems.push("webfont belum siap");

  if (problems.length) failures += 1;

  console.log(
    `${String(width).padStart(4)}px  h1=${r.h1Size} (${r.h1Lines} baris)  produk=${r.productCols}kol  rail=${r.railVisible ? "y" : "n"} toggle=${r.toggleVisible ? "y" : "n"} sticky=${r.stickyVisible ? "y" : "n"}`
  );
  console.log(problems.length ? `      ✗ ${problems.join("\n      ✗ ")}` : "      ✓ bersih");

  await page.screenshot({ path: `qa-shots/w${width}.png`, fullPage: true });
}

/* ---------- interaksi menu mobile ---------- */
await page.setViewport({ width: 375, height: 780 });
await page.goto(URL, { waitUntil: "networkidle2" });
await page.click(".nav__toggle");
await new Promise((r) => setTimeout(r, 400));

const menuOpen = await page.evaluate(() => ({
  visibility: getComputedStyle(document.querySelector(".sheet")).visibility,
  expanded: document.querySelector(".nav__toggle").getAttribute("aria-expanded"),
  focused: document.activeElement?.className?.toString().slice(0, 24),
  mainInert: document.querySelector("main").hasAttribute("inert"),
}));
await page.screenshot({ path: "qa-shots/menu-open.png" });

/* klik tautan Produk di dalam lembar menu → harus menutup + menggulir */
await page.click(".sheet__link[href='#produk']");
await new Promise((r) => setTimeout(r, 900));
const afterNav = await page.evaluate(() => ({
  closed: getComputedStyle(document.querySelector(".sheet")).visibility === "hidden",
  scrollY: Math.round(window.scrollY),
  mainInert: document.querySelector("main").hasAttribute("inert"),
}));

await page.click(".nav__toggle");
await new Promise((r) => setTimeout(r, 300));
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 400));
const afterEscape = await page.evaluate(() => ({
  visibility: getComputedStyle(document.querySelector(".sheet")).visibility,
  expanded: document.querySelector(".nav__toggle").getAttribute("aria-expanded"),
  focused: document.activeElement?.className?.toString().slice(0, 24),
}));

/* sticky CTA: tersembunyi di atas, muncul setelah hero, tidak menutupi
 * baris terakhir footer, dan hilang di desktop */
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 300));
const stickyTop = await page.evaluate(() => document.querySelector(".sticky-cta").dataset.visible);
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
await new Promise((r) => setTimeout(r, 400));
const stickyDown = await page.evaluate(() => document.querySelector(".sticky-cta").dataset.visible);

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 500));
const stickyOverlap = await page.evaluate(() => {
  const bar = document.querySelector(".sticky-cta").getBoundingClientRect();
  const last = document.querySelector(".foot__legal").getBoundingClientRect();
  return {
    barTop: Math.round(bar.top),
    footerBottom: Math.round(last.bottom),
    covered: last.bottom > bar.top + 1,
  };
});

const carousel = await page.evaluate(() => {
  const g = document.querySelector(".gallery");
  return { scrollW: Math.round(g.scrollWidth), clientW: Math.round(g.clientWidth) };
});

await page.setViewport({ width: 1280, height: 800 });
await page.goto(URL, { waitUntil: "networkidle2" });
const desktopChrome = await page.evaluate(() => ({
  sticky: getComputedStyle(document.querySelector(".sticky-cta")).display,
  sheet: getComputedStyle(document.querySelector(".sheet")).display,
  rail: getComputedStyle(document.querySelector(".nav__rail")).display,
}));

/* Gate 44b — seluruh isi hero harus terbaca tanpa scroll di 1280 x 800 */
await page.evaluate(() => window.scrollTo(0, 0));
const heroFold = await page.evaluate(() => {
  const vh = window.innerHeight;
  const r = (sel) => {
    const el = document.querySelector(sel);
    return el ? Math.round(el.getBoundingClientRect().bottom) : null;
  };
  return {
    vh,
    cta: r(".hero__actions"),
    media: r(".hero__media"),
    caption: r(".hero__caption"),
    mediaRight: Math.round(document.querySelector(".hero__media img").getBoundingClientRect().right),
    vw: window.innerWidth,
    navHeight: Math.round(document.querySelector(".nav").getBoundingClientRect().height),
    heroPaddingTop: getComputedStyle(document.querySelector(".hero")).paddingTop,
    heroPaddingBottom: getComputedStyle(document.querySelector(".hero")).paddingBottom,
  };
});
await page.screenshot({ path: "qa-shots/fold-1280x800.png" });
console.log("hero di 1280x800:", JSON.stringify(heroFold));
console.log("carousel mobile:", JSON.stringify(carousel), "| desktop:", JSON.stringify(desktopChrome));
console.log("sticky vs footer:", JSON.stringify(stickyOverlap));

console.log("\nmenu buka:", JSON.stringify(menuOpen));
console.log("klik tautan:", JSON.stringify(afterNav));
console.log("escape:", JSON.stringify(afterEscape));
console.log("sticky CTA di atas:", stickyTop, "setelah scroll:", stickyDown);
console.log("console errors:", consoleErrors.length ? consoleErrors.slice(0, 5) : "tidak ada");
console.log(failures ? `\n${failures} viewport bermasalah` : "\nSemua viewport bersih");

await browser.close();
server?.kill();
process.exitCode = failures ? 1 : 0;
