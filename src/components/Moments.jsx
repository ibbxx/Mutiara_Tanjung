import { momentsSection } from "../data/site.js";
import Reveal from "./Reveal.jsx";

/* Tidak ada testimoni, rating, atau angka karangan di halaman ini — bagian
 * ini menjelaskan momen pemakaian yang nyata, bukan pujian yang dibuat-buat. */
export default function Moments() {
  return (
    <section className="section section--moments" id="momen">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title">{momentsSection.title}</h2>
          <p className="section__lede">{momentsSection.description}</p>
        </Reveal>

        <ul className="moments">
          {momentsSection.items.map((item, index) => (
            <Reveal as="li" className="moment" key={item.name} delay={index % 2}>
              <h3 className="moment__name">{item.name}</h3>
              <p className="moment__body">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
