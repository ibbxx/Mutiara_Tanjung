import { products } from "../data/products.js";
import { productsSection } from "../data/site.js";
import ProductCard from "./ProductCard.jsx";
import Reveal from "./Reveal.jsx";

/* F6 Product card grid. Ritme datang dari produknya, bukan dari layout —
 * jadi kartunya seragam. Mobile 2 kolom rapat, desktop 3 kolom. */
export default function ProductSection() {
  return (
    <section className="section section--products" id="produk">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title">{productsSection.title}</h2>
          <p className="section__lede">{productsSection.description}</p>
        </Reveal>

        <ul className="product-grid">
          {products.map((product, index) => (
            <Reveal as="li" key={product.id} className="product-grid__item" delay={index % 3}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
