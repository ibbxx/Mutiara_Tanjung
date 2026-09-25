import { site } from "../data/site.js";

/** Nomor WhatsApp tanpa karakter non-digit. Kosong = belum diisi. */
export function whatsappNumber() {
  return String(site.whatsapp || "").replace(/\D/g, "");
}

export function hasWhatsApp() {
  return whatsappNumber().length > 0;
}

/**
 * URL pesanan. Bila nomor WhatsApp belum diisi di src/data/site.js,
 * CTA mengarah ke bagian Kontak (tidak ada nomor palsu yang ditampilkan).
 */
export function orderHref(fallback = "#kontak") {
  if (!hasWhatsApp()) return fallback;
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`;
}

/** Atribut tambahan untuk link keluar (WhatsApp / Instagram / marketplace). */
export function externalLinkProps() {
  return { target: "_blank", rel: "noopener noreferrer" };
}

export function instagramHref() {
  const handle = String(site.instagram || "").replace(/^@/, "").trim();
  return handle ? `https://instagram.com/${handle}` : "";
}
