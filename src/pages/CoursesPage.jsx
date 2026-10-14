import { useMemo, useState } from "react";

import { CourseCard } from "../components/Cards";
import { PageHead, Empty } from "../components/ui";
import { Icon } from "../components/Icon";
import { COURSES, LEVELS } from "../data/courses";

export default function CoursesPage() {
  const [level, setLevel] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return COURSES.filter(
      (c) =>
        (level === "All" || c.level === level) &&
        (!needle ||
          c.title.toLowerCase().includes(needle) ||
          c.summary.toLowerCase().includes(needle))
    );
  }, [level, q]);

  return (
    <section className="page">
      <div className="wrap">
        <PageHead
          current="Courses"
          title="Courses"
          sub="Structured tracks with lessons, projects and a clear finish line. Start free on Python, level up to AI agents."
        />

        <div className="toolbar">
          <div className="chips">
            {LEVELS.map((l) => (
              <button
                key={l}
                className={`chip${level === l ? " on" : ""}`}
                onClick={() => setLevel(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Icon name="search" size={16} />
            <input
              type="search"
              placeholder="Search courses…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search courses"
            />
          </label>
        </div>

        <p className="result-count">
          {list.length} course{list.length === 1 ? "" : "s"}
          {level !== "All" && ` · ${level}`}
        </p>

        {list.length > 0 ? (
          <div className="course-grid">
            {list.map((c) => (
              <CourseCard course={c} key={c.id} />
            ))}
          </div>
        ) : (
          <Empty
            title="No courses match that filter"
            text="Try another level or clear the search."
          />
        )}
      </div>
    </section>
  );
}
