import { featuresSection } from "../data/site.js";
import Reveal from "./Reveal.jsx";

/* Tanpa kartu, tanpa ikon di dalam kotak warna. Empat alasan disusun sebagai
 * daftar editorial dengan lebar kolom yang sengaja tidak sama — desktop saja. */
export default function Features() {
  return (
    <section className="section section--features" id="keunggulan">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title">{featuresSection.title}</h2>
          <p className="section__lede">{featuresSection.description}</p>
        </Reveal>

        <ul className="qualities">
          {featuresSection.items.map((item, index) => (
            <Reveal as="li" className="quality" key={item.name} delay={index % 2}>
              <h3 className="quality__name">{item.name}</h3>
              <p className="quality__body">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
