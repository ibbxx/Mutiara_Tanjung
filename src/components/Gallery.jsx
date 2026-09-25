import { gallery } from "../data/products.js";
import { gallerySection } from "../data/site.js";
import Photo from "./Photo.jsx";
import Reveal from "./Reveal.jsx";

const GALLERY_SIZES = "(min-width: 60rem) 24rem, 78vw";

/* Sebaran foto produk: carousel geser di mobile, komposisi asimetris dengan
 * tinggi yang ditumpuk berbeda di desktop. Foto tetap utuh (rasio 2:3). */
export default function Gallery() {
  return (
    <section className="section section--gallery" id="galeri">
      <div className="shell">
        <Reveal className="section__head section__head--tight">
          <h2 className="section__title">{gallerySection.title}</h2>
          <p className="section__lede">{gallerySection.description}</p>
        </Reveal>
      </div>

      <div className="shell shell--flush">
        <ul className="gallery" aria-label="Galeri produk Mutiara Tanjung">
          {gallery.map((item) => (
            <li className="gallery__item" key={item.id}>
              <figure className="gallery__figure">
                <div className="gallery__frame">
                  <Photo
                    base={item.base}
                    alt={item.alt}
                    sizes={GALLERY_SIZES}
                  />
                </div>
                <figcaption className="gallery__caption">{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="gallery__hint">Geser untuk melihat semuanya</p>
      </div>
    </section>
  );
}
