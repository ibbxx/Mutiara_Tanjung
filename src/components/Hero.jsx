import { hero } from "../data/site.js";
import { orderHref } from "../lib/links.js";
import { IconArrow } from "./Icons.jsx";
import Photo from "./Photo.jsx";

/* Visual hero memakai potongan produk berlatar transparan (ASSET/ORIGINAL.png),
 * jadi produk tampil utuh mengambang di atas kertas — tanpa bingkai, tanpa
 * pemotongan. Fallback JPEG-nya sudah diratakan ke warna halaman. */
const HERO_WIDTHS = [480, 768, 1152];
const HERO_SIZES =
  "(min-width: 75rem) 26rem, (min-width: 40rem) 22rem, calc(100vw - 2 * clamp(1rem, 5vw, 2.5rem))";

/* Hero: H2 Split Diptych — urutan mobile sesuai permintaan:
 * label brand → headline → deskripsi → CTA → visual produk. */
export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="hero__label enter" style={{ "--i": 0 }}>
            {hero.label}
          </p>
          <h1 className="hero__title enter" style={{ "--i": 1 }}>
            {hero.title}
          </h1>
          <p className="hero__lede enter" style={{ "--i": 2 }}>
            {hero.description}
          </p>
          <div className="hero__actions enter" style={{ "--i": 3 }}>
            <a className="btn btn--solid" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </a>
            <a className="btn btn--outline" href={orderHref()}>
              {hero.secondaryCta.label}
              <IconArrow />
            </a>
          </div>
        </div>

        {/* Tanpa animasi masuk: ini elemen LCP, biar langsung tercetak. */}
        <figure className="hero__media">
          <Photo
            base="/images/hero-produk"
            alt={hero.mediaAlt}
            sizes={HERO_SIZES}
            widths={HERO_WIDTHS}
            fallbackSrc="/images/hero-produk-768.jpg"
            width={1536}
            height={1024}
            priority
          />
          <figcaption className="hero__caption">{hero.mediaCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
