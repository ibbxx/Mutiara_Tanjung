import { site } from "../data/site.js";

const MARKS = {
  nav: {
    src: "/images/logo-72.jpg",
    srcSet: "/images/logo-72.webp 1x, /images/logo-152.webp 2x",
    width: 72,
    height: 72,
  },
  footer: {
    src: "/images/logo-152.jpg",
    srcSet: "/images/logo-152.webp 1x, /images/logo-500.webp 2x",
    width: 152,
    height: 152,
  },
};

/** Logo asli (ASSET/logo.jpeg) + nama brand dalam huruf display. */
export default function Wordmark({ variant = "nav", className = "" }) {
  const mark = MARKS[variant] ?? MARKS.nav;

  return (
    <span className={`wordmark wordmark--${variant}${className ? ` ${className}` : ""}`}>
      <picture>
        <source type="image/webp" srcSet={mark.srcSet} />
        <img
          className="wordmark__mark"
          src={mark.src}
          width={mark.width}
          height={mark.height}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      </picture>
      <span className="wordmark__text">{site.name}</span>
    </span>
  );
}
