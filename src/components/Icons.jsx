/* Satu set ikon buatan tangan (stroke 1.6, ujung bulat) supaya bobot
 * garisnya konsisten di seluruh halaman. brand marks (WhatsApp) memakai
 * bentuk resminya sendiri. */

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function IconArrow({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 12h14" />
      <path d="M12.5 6.5 18 12l-5.5 5.5" />
    </svg>
  );
}

export function IconMenu({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  );
}

export function IconClose({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function IconWhatsApp({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2.5c-5.23 0-9.48 4.25-9.48 9.48 0 1.67.44 3.3 1.27 4.73L2.5 21.5l4.93-1.29a9.44 9.44 0 0 0 4.61 1.19h.01c5.22 0 9.47-4.25 9.47-9.48 0-2.53-.98-4.91-2.77-6.7a9.4 9.4 0 0 0-6.71-2.72Zm0 17.33h-.01a7.86 7.86 0 0 1-4-1.1l-.29-.17-2.97.78.79-2.9-.19-.3a7.87 7.87 0 0 1-1.2-4.19 7.88 7.88 0 0 1 13.46-5.57 7.82 7.82 0 0 1 2.32 5.58 7.88 7.88 0 0 1-7.91 7.87Zm4.34-5.9c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.62-1.17-1.39-1.31-1.63-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function IconInstagram({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
