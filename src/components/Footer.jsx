import { footer, site } from "../data/site.js";
import { externalLinkProps, hasWhatsApp, instagramHref, orderHref } from "../lib/links.js";
import { IconInstagram, IconWhatsApp } from "./Icons.jsx";
import Wordmark from "./Wordmark.jsx";

/* Ft1 Mast-headed — satu pita: brand + tagline, tautan di sebelahnya,
 * baris legal di bawah. Bukan empat kolom sitemap. */
export default function Footer() {
  const instagram = instagramHref();
  const whatsapp = hasWhatsApp();

  return (
    <footer className="foot">
      <div className="shell foot__inner">
        <div className="foot__brand">
          <Wordmark variant="footer" />
          <p className="foot__description">{footer.description}</p>
        </div>

        <nav className="foot__nav" aria-label="Navigasi footer">
          <ul className="foot__list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a className="foot__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {(whatsapp || instagram) && (
            <ul className="foot__social">
              {whatsapp ? (
                <li>
                  <a className="foot__link foot__link--icon" href={orderHref()} {...externalLinkProps()}>
                    <IconWhatsApp size={18} />
                    WhatsApp
                  </a>
                </li>
              ) : null}
              {instagram ? (
                <li>
                  <a className="foot__link foot__link--icon" href={instagram} {...externalLinkProps()}>
                    <IconInstagram size={18} />
                    Instagram
                  </a>
                </li>
              ) : null}
            </ul>
          )}
        </nav>
      </div>

      <div className="shell foot__legal">
        <p>{footer.copyright}</p>
        <p className="foot__note">
          Foto produk di halaman ini adalah foto asli Mutiara Tanjung.
        </p>
      </div>
    </footer>
  );
}
