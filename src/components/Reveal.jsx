import { useEffect, useRef, useState } from "react";

/**
 * Reveal-once wrapper. Adds a short fade + 8px rise the first time the block
 * enters the viewport. Motion collapses to a plain crossfade when the visitor
 * asks for reduced motion. Without JS the `html.js` flag is never set and the
 * content simply renders visible (see styles.css).
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? " is-shown" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--i": delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
