/* Foto responsif — WebP dulu, JPEG sebagai fallback.
 * Semua turunan memakai rasio asli sumbernya, jadi tidak ada pemotongan.
 *
 * widths        lebar yang tersedia sebagai file (default: set foto produk)
 * fallbackSrc   file JPEG untuk browser tanpa WebP / tanpa dukungan srcset
 */
const DEFAULT_WIDTHS = [240, 480, 720, 960];
const DEFAULT_DIMENSIONS = { width: 960, height: 1440 };

const buildSrcSet = (base, ext, widths) =>
  widths.map((width) => `${base}-${width}.${ext} ${width}w`).join(", ");

export default function Photo({
  base,
  alt,
  sizes,
  widths = DEFAULT_WIDTHS,
  fallbackSrc,
  width = DEFAULT_DIMENSIONS.width,
  height = DEFAULT_DIMENSIONS.height,
  priority = false,
  className = "",
}) {
  const fallback = fallbackSrc ?? `${base}-${widths[widths.length - 1]}.jpg`;

  return (
    <picture>
      <source type="image/webp" srcSet={buildSrcSet(base, "webp", widths)} sizes={sizes} />
      <img
        className={className}
        src={fallback}
        srcSet={buildSrcSet(base, "jpg", widths)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}
