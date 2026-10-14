import { useMemo, useState } from "react";

import { ToolCard } from "../components/Cards";
import { PageHead, Empty } from "../components/ui";
import { Icon } from "../components/Icon";
import { TOOLS, TOOL_CATEGORIES } from "../data/tools";

export default function ToolsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TOOLS.filter(
      (t) =>
        (cat === "All" || t.category === cat) &&
        (!needle || t.name.toLowerCase().includes(needle))
    );
  }, [cat, q]);

  return (
    <section className="page">
      <div className="wrap">
        <PageHead
          current="AI Tools"
          title="AI tools directory"
          sub="The shortlist we actually use in videos — what each tool is for, what it costs, and when to reach for it."
        />

        <div className="toolbar">
          <div className="chips">
            {TOOL_CATEGORIES.map((c) => (
              <button
                key={c}
                className={`chip${cat === c ? " on" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Icon name="search" size={16} />
            <input
              type="search"
              placeholder="Search tools…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search tools"
            />
          </label>
        </div>

        <p className="result-count">
          {list.length} tool{list.length === 1 ? "" : "s"}
          {cat !== "All" && ` in ${cat}`}
        </p>

        {list.length > 0 ? (
          <div className="tools-grid">
            {list.map((t) => (
              <ToolCard tool={t} key={t.id} />
            ))}
          </div>
        ) : (
          <Empty title="No tools match that search" text="Try another category." />
        )}
      </div>
    </section>
  );
}
