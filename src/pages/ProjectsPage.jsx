import { useMemo, useState } from "react";

import { ProjectCard } from "../components/Cards";
import { PageHead, Empty } from "../components/ui";
import { PROJECTS, DIFFICULTIES } from "../data/projects";

export default function ProjectsPage() {
  const [diff, setDiff] = useState("All");

  const list = useMemo(
    () => (diff === "All" ? PROJECTS : PROJECTS.filter((p) => p.difficulty === diff)),
    [diff]
  );

  return (
    <section className="page">
      <div className="wrap">
        <PageHead
          current="Projects"
          title="Projects"
          sub="Final-year-grade builds with full source code. Pick one, run it, then make it yours — that's how portfolios get made."
        />

        <div className="toolbar">
          <div className="chips">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                className={`chip${diff === d ? " on" : ""}`}
                onClick={() => setDiff(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <p className="result-count">
          {list.length} project{list.length === 1 ? "" : "s"}
          {diff !== "All" && ` · ${diff}`}
        </p>

        {list.length > 0 ? (
          <div className="project-grid">
            {list.map((p) => (
              <ProjectCard project={p} key={p.id} />
            ))}
          </div>
        ) : (
          <Empty title="No projects at that level yet" text="Try another difficulty." />
        )}
      </div>
    </section>
  );
}
