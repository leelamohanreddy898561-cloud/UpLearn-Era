import { useEffect, useState } from "react";
import { Icon } from "./Icon";

// Image gallery with a lightbox. Click a tile to open; use arrow keys or the
// arrows to browse; Escape or the backdrop closes.
export default function GalleryGrid({ items }) {
  const [index, setIndex] = useState(null); // null = closed

  const close = () => setIndex(null);
  const step = (dir) =>
    setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length));

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [index, items.length]);

  const active = index === null ? null : items[index];

  return (
    <>
      <div className="gallery-grid">
        {items.map((img, i) => (
          <button
            key={img.id}
            className={`g-item ${img.grad}${img.wide ? " wide" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Open ${img.title} in full view`}
          >
            <span className="g-zoom">
              <Icon name="search" size={18} />
            </span>
            <span className="g-cap">
              <b>{img.title}</b>
              <small>{img.category}</small>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={active.title}>
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <div className={`lb-art ${active.grad}`}>
              <span className="lb-art-title">{active.title}</span>
            </div>
            <div className="lb-meta">
              <div>
                <h3>{active.title}</h3>
                <p>
                  {active.category} — {active.caption}
                </p>
              </div>
              <span className="lb-count">
                {index + 1} / {items.length}
              </span>
            </div>
          </div>

          <button className="lb-btn prev" onClick={() => step(-1)} aria-label="Previous image">
            <Icon name="chevron" size={22} />
          </button>
          <button className="lb-btn next" onClick={() => step(1)} aria-label="Next image">
            <Icon name="chevron" size={22} />
          </button>
          <button className="lb-close" onClick={close} aria-label="Close full view">
            <Icon name="close" size={20} />
          </button>
        </div>
      )}
    </>
  );
}
