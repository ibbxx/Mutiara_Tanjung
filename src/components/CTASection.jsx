import { ctaSection } from "../data/site.js";
import { orderHref } from "../lib/links.js";
import { IconArrow } from "./Icons.jsx";
import Reveal from "./Reveal.jsx";

/* Satu-satunya bagian bersurface gelap — memberi jeda ritme di halaman yang
 * seluruhnya krem, dan memakai warna cokelat tua dari aset produk. */
export default function CTASection() {
  return (
    <section className="section section--cta" id="pesan">
      <div className="shell">
        <Reveal className="cta-band">
          <h2 className="cta-band__title">{ctaSection.title}</h2>
          <p className="cta-band__text">{ctaSection.description}</p>
          <a className="btn btn--band" href={orderHref()}>
            {ctaSection.cta.label}
            <IconArrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
