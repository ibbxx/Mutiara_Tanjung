import { useEffect, useRef, useState } from "react";
import { site } from "../data/site.js";
import { orderHref } from "../lib/links.js";
import { IconClose, IconMenu } from "./Icons.jsx";
import MobileMenu from "./MobileMenu.jsx";
import Wordmark from "./Wordmark.jsx";

const MENU_ID = "menu-mobile";

/* Nav: N9 Edge-aligned minimal — brand di tepi kiri, aksi di tepi kanan.
 * Deretan tautan hanya muncul di desktop (>= 60rem); di mobile semua tujuan
 * masuk ke dalam lembar menu. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* Selama lembar menu terbuka, konten di belakangnya dikeluarkan dari
     * urutan fokus supaya Tab tidak masuk ke halaman yang tertutup. */
    const behind = [document.querySelector("main"), document.querySelector("footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));

    return () => {
      document.body.style.overflow = previous;
      behind.forEach((el) => el?.removeAttribute("inert"));
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="nav" data-open={open ? "true" : "false"}>
        <div className="shell nav__inner">
          {/* Baris 1 — identitas brand + aksi. Di mobile hanya [Logo][Menu]. */}
          <div className="nav__top">
            <a className="nav__brand" href="#home" aria-label={`${site.name} — kembali ke atas`}>
              <Wordmark variant="nav" />
            </a>

            <div className="nav__end">
              <a className="btn btn--solid btn--sm nav__cta" href={orderHref()}>
                Pesan Sekarang
              </a>
              <button
                className="nav__toggle"
                type="button"
                ref={toggleRef}
                aria-expanded={open}
                aria-controls={MENU_ID}
                onClick={() => setOpen((value) => !value)}
              >
                <span className="nav__toggle-icon" aria-hidden="true">
                  {open ? <IconClose /> : <IconMenu />}
                </span>
                <span className="nav__toggle-text">{open ? "Tutup" : "Menu"}</span>
              </button>
            </div>
          </div>

          {/* Baris 2 — indeks bagian, hanya di desktop. */}
          <nav className="nav__rail" aria-label="Navigasi utama">
            <ul className="nav__list">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a className="nav__link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="nav__meta">{site.navMeta}</p>
          </nav>
        </div>
      </header>

      <MobileMenu id={MENU_ID} open={open} onClose={close} toggleRef={toggleRef} />
    </>
  );
}
