import { useEffect, useState } from "react";
import { stickyCta } from "../data/site.js";
import { orderHref } from "../lib/links.js";
import { IconArrow } from "./Icons.jsx";

/* C4 Sticky bottom bar — mobile saja. Muncul setelah pengunjung melewati
 * hero, sadar safe-area iOS, dan jarak bawah halaman dijaga oleh .sticky-spacer
 * supaya tidak menutupi konten terakhir. */
export default function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.55);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      className="sticky-cta"
      data-visible={visible ? "true" : "false"}
      inert={visible ? undefined : true}
      aria-hidden={visible ? undefined : "true"}
    >
      <p className="sticky-cta__note">{stickyCta.note}</p>
      <a className="btn btn--solid btn--sm sticky-cta__action" href={orderHref()}>
        {stickyCta.cta.label}
        <IconArrow size={18} />
      </a>
    </aside>
  );
}
