import { useEffect, useRef } from "react";
import { site } from "../data/site.js";
import { orderHref } from "../lib/links.js";
import { IconArrow } from "./Icons.jsx";

/**
 * Lembar menu mobile. Selalu ada di DOM supaya transisinya bisa dianimasikan,
 * tapi dikeluarkan dari urutan fokus (`inert`) selama tertutup.
 */
export default function MobileMenu({ id, open, onClose, toggleRef }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const firstLink = panelRef.current?.querySelector("a, button");
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        toggleRef?.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, toggleRef]);

  return (
    <div
      className="sheet"
      id={id}
      ref={panelRef}
      data-open={open ? "true" : "false"}
      inert={open ? undefined : true}
      aria-hidden={open ? undefined : "true"}
    >
      <nav className="sheet__nav" aria-label="Navigasi mobile">
        <ul className="sheet__list">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a className="sheet__link" href={item.href} onClick={onClose}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a className="btn btn--solid sheet__cta" href={orderHref()} onClick={onClose}>
        Pesan Sekarang
        <IconArrow />
      </a>
      <p className="sheet__note">
        Pesanan dibalas langsung oleh penjual lewat WhatsApp.
      </p>
    </div>
  );
}
