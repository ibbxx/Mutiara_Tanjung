import { about, site } from "../data/site.js";
import Reveal from "./Reveal.jsx";

/* Bagian kedua dari pola diptych: media di kiri, cerita di kanan (mobile:
 * media dulu, lalu cerita). Media memakai satu-satunya aset brand yang
 * benar-benar ada — logo aslinya. */
export default function About() {
  return (
    <section className="section section--about" id="tentang">
      <div className="shell about">
        <Reveal className="about__media">
          <figure className="plaque">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/logo-152.webp 152w, /images/logo-500.webp 500w"
                sizes="(min-width: 60rem) 18rem, 12rem"
              />
              <img
                src="/images/logo-500.jpg"
                srcSet="/images/logo-152.jpg 152w, /images/logo-500.jpg 500w"
                sizes="(min-width: 60rem) 18rem, 12rem"
                width="500"
                height="500"
                alt={`Logo ${site.name}`}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="plaque__caption">{about.caption}</figcaption>
          </figure>
        </Reveal>

        <Reveal className="about__copy" delay={1}>
          <h2 className="section__title">{about.title}</h2>
          {about.paragraphs.map((paragraph) => (
            <p className="prose" key={paragraph.slice(0, 24)}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
