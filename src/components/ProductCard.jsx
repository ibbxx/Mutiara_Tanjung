import { orderHref } from "../lib/links.js";
import { productsSection } from "../data/site.js";
import { IconArrow } from "./Icons.jsx";
import Photo from "./Photo.jsx";

const CARD_SIZES =
  "(min-width: 60rem) 22rem, (min-width: 40rem) 20rem, 45vw";

function formatRupiah(value) {
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}

export default function ProductCard({ product }) {
  const { name, description, price, unit, image } = product;

  return (
    <article className="product">
      <div className="product__media">
        {/* Rasio wadah = rasio file asli (2:3), jadi object-fit: cover
            tidak memotong produk sama sekali. Jangan diubah tanpa
            menyesuaikan foto sumbernya. */}
        <Photo
          base={image.base}
          alt={image.alt}
          sizes={CARD_SIZES}
          width={image.width}
          height={image.height}
        />
      </div>

      <div className="product__body">
        <h3 className="product__name">{name}</h3>
        <p className="product__desc">{description}</p>

        {price != null && (
          <p className="product__price">
            <span className="product__price-value">{formatRupiah(price)}</span>
            {unit ? <span className="product__price-unit">{unit}</span> : null}
          </p>
        )}

        <a className="link-action product__action" href={orderHref()}>
          {productsSection.cardAction}
          <IconArrow size={18} />
        </a>
      </div>
    </article>
  );
}
