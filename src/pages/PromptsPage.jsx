import { useMemo, useState } from "react";

import { PromptCard } from "../components/Cards";
import { PageHead, Empty } from "../components/ui";
import { Icon } from "../components/Icon";
import { useToast } from "../components/Toast";
import { PROMPTS, PROMPT_CATEGORIES } from "../data/prompts";

export default function PromptsPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [toast, toastEl] = useToast();

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PROMPTS.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!needle ||
          p.title.toLowerCase().includes(needle) ||
          p.text.toLowerCase().includes(needle) ||
          p.tags.some((t) => t.includes(needle)))
    );
  }, [cat, q]);

  const copy = (p) => {
    navigator.clipboard?.writeText(p.text).then(
      () => toast(`"${p.title}" copied to clipboard`),
      () => toast("Copy failed — select the text manually")
    );
  };

  return (
    <section className="page">
      {toastEl}
      <div className="wrap">
        <PageHead
          current="Prompt Library"
          title="Prompt library"
          sub="Battle-tested prompts for studying, coding, projects and placements. Copy one, edit the {braces}, make it yours."
        />

        <div className="toolbar">
          <div className="chips">
            {PROMPT_CATEGORIES.map((c) => (
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
              placeholder="Search prompts, tags…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search prompts"
            />
          </label>
        </div>

        <p className="result-count">
          {list.length} prompt{list.length === 1 ? "" : "s"}
          {cat !== "All" && ` in ${cat}`}
        </p>

        {list.length > 0 ? (
          <div className="prompt-grid">
            {list.map((p) => (
              <PromptCard prompt={p} onCopy={copy} key={p.id} />
            ))}
          </div>
        ) : (
          <Empty title="No prompts found" text="Try a different category or search term." />
        )}

        <div className="prompt-tip">
          <Icon name="sparkles" size={18} />
          <div>
            <b>Prompting rule of thumb:</b> give the model a role, the context
            it needs, and the format you want back. Everything else is tuning.
          </div>
        </div>
      </div>
    </section>
  );
}
