import { useMemo, useState } from "react";

import VideoEmbed from "../components/VideoEmbed";
import { PageHead, Empty } from "../components/ui";
import { Icon } from "../components/Icon";
import { VIDEOS, VIDEO_TOPICS } from "../data/videos";
import { SITE } from "../data/site";

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
          sub="Every video from the UpLearn Era channel — AI basics, machine learning and deep learning explained in Telugu."
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
            {/* "Upcoming Courses" opens the YouTube channel, styled like a chip */}
            <a
              className="chip chip-upcoming"
              href={SITE.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="Upcoming Courses — open our YouTube channel"
              title="Watch upcoming courses on YouTube"
            >
              <Icon name="sparkles" size={13} fill />
              Upcoming Courses
            </a>
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
              <VideoEmbed video={v} key={v.id} />
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
