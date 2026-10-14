import { useMemo, useState } from "react";

import GalleryGrid from "../components/GalleryGrid";
import { PageHead, Empty } from "../components/ui";
import { IMAGES, IMAGE_CATEGORIES } from "../data/images";

export default function ImagesPage() {
  const [cat, setCat] = useState("All");

  const list = useMemo(
    () => (cat === "All" ? IMAGES : IMAGES.filter((i) => i.category === cat)),
    [cat]
  );

  return (
    <section className="page">
      <div className="wrap">
        <PageHead
          current="Images"
          title="Image gallery"
          sub="Cheat sheets, diagrams and infographics from the videos — free to save for revision. Click any tile to open it full-size."
        />

        <div className="toolbar">
          <div className="chips">
            {IMAGE_CATEGORIES.map((c) => (
              <button
                key={c}
                className={`chip${cat === c ? " on" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {list.length > 0 ? (
          <GalleryGrid items={list} />
        ) : (
          <Empty
            title="Nothing in this category yet"
            text="New visuals are added with every video."
          />
        )}
      </div>
    </section>
  );
}
