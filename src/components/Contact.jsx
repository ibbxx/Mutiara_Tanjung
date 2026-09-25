import { contactSection, site } from "../data/site.js";
import {
  externalLinkProps,
  hasWhatsApp,
  instagramHref,
  orderHref,
} from "../lib/links.js";
import { IconArrow, IconInstagram, IconWhatsApp } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

function formatWhatsApp(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  const isId = digits.startsWith("62");
  const local = isId ? digits.slice(2) : digits;
  const groups = local.match(/.{1,4}/g) || [];
  return `${isId ? "+62" : "+"} ${groups.join("-")}`;
}

/* Tanpa formulir panjang. Hanya kanal yang benar-benar diisi di
 * src/data/site.js yang dirender — sisanya disembunyikan, bukan dikarang. */
export default function Contact() {
  const whatsapp = hasWhatsApp();
  const instagram = instagramHref();
  const email = site.email?.trim();
  const address = site.address?.trim();
  const marketplace = (site.marketplace || []).filter((item) => item?.url);

  return (
    <section className="section section--contact" id="kontak">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title">{contactSection.title}</h2>
          <p className="section__lede">{contactSection.description}</p>
        </Reveal>

        <Reveal as="ul" className="contact" delay={1}>
          <li className="contact__row">
            {whatsapp ? (
              <a className="contact__link" href={orderHref()} {...externalLinkProps()}>
                <span className="contact__key">
                  <IconWhatsApp size={18} />
                  WhatsApp
                </span>
                <span className="contact__value">
                  {formatWhatsApp(site.whatsapp)}
                  <IconArrow size={18} />
                </span>
              </a>
            ) : (
              <span className="contact__link contact__link--pending">
                <span className="contact__key">
                  <IconWhatsApp size={18} />
                  WhatsApp
                </span>
                <span className="contact__value">Belum tersedia</span>
              </span>
            )}
          </li>

          {instagram ? (
            <li className="contact__row">
              <a className="contact__link" href={instagram} {...externalLinkProps()}>
                <span className="contact__key">
                  <IconInstagram size={18} />
                  Instagram
                </span>
                <span className="contact__value">
                  @{site.instagram.replace(/^@/, "")}
                  <IconArrow size={18} />
                </span>
              </a>
            </li>
          ) : null}

          {email ? (
            <li className="contact__row">
              <a className="contact__link" href={`mailto:${email}`}>
                <span className="contact__key">Email</span>
                <span className="contact__value">{email}</span>
              </a>
            </li>
          ) : null}

          {address ? (
            <li className="contact__row">
              <span className="contact__link contact__link--plain">
                <span className="contact__key">Alamat</span>
                <span className="contact__value">{address}</span>
              </span>
            </li>
          ) : null}

          {marketplace.map((item) => (
            <li className="contact__row" key={item.label}>
              <a className="contact__link" href={item.url} {...externalLinkProps()}>
                <span className="contact__key">{item.label}</span>
                <span className="contact__value">
                  Buka toko
                  <IconArrow size={18} />
                </span>
              </a>
            </li>
          ))}
        </Reveal>

        {!whatsapp ? (
          <Reveal as="p" className="owner-note" delay={2}>
            Catatan untuk pengelola situs: isi <code>whatsapp</code> di{" "}
            <code>src/data/site.js</code> agar semua tombol “Pesan Sekarang”
            langsung membuka WhatsApp. Selama belum diisi, tombol pesanan
            mengarah ke bagian Kontak ini.
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
