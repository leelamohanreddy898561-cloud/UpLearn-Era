import { useMemo, useState } from "react";

import VideoCard from "../components/Cards";
import { PageHead, Empty } from "../components/ui";
import { Icon } from "../components/Icon";
import { VIDEOS, VIDEO_TOPICS } from "../data/videos";

export default function VideosPage() {
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return VIDEOS.filter(
      (v) =>
        (topic === "All" || v.topic === topic) &&
        (!needle || v.title.toLowerCase().includes(needle))
    );
  }, [topic, q]);

  return (
    <section className="page">
      <div className="wrap">
        <PageHead
          current="Videos"
          title="Video library"
          sub="Every tutorial from the UpLearn Era channel — Python, ML, deep learning, AI tools and project walkthroughs."
        />

        <div className="toolbar">
          <div className="chips">
            {VIDEO_TOPICS.map((t) => (
              <button
                key={t}
                className={`chip${topic === t ? " on" : ""}`}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Icon name="search" size={16} />
            <input
              type="search"
              placeholder="Search videos…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search videos"
            />
          </label>
        </div>

        <p className="result-count">
          {list.length} video{list.length === 1 ? "" : "s"}
          {topic !== "All" && ` in ${topic}`}
        </p>

        {list.length > 0 ? (
          <div className="video-grid">
            {list.map((v) => (
              <VideoCard video={v} key={v.id} />
            ))}
          </div>
        ) : (
          <Empty
            title="No videos match that search"
            text="Try a different topic chip, or clear the search box."
          />
        )}
      </div>
    </section>
  );
}
