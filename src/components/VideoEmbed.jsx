import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

// YouTube video embed with a custom fullscreen button. Real channel videos
// render an iframe; placeholders show a gradient card until their URL is added.
export default function VideoEmbed({ video }) {
  const isRealVideo = /youtube\.com\/watch\?v=|youtu\.be\//.test(video.yt || "");
  const embedSrc = isRealVideo
    ? `https://www.youtube.com/embed/${video.yt.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1]}`
    : null;
  const frameRef = useRef(null);
  const [isFs, setIsFs] = useState(false);

  // keep the button label in sync with the browser's fullscreen state
  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  return (
    <figure className="video-embed">
      <div className={`ve-frame ${video.grad}`} ref={frameRef}>
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <a
            className="ve-fallback"
            href={video.yt}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch ${video.title} on YouTube`}
          >
            <span className="ve-play">
              <Icon name="play" size={22} fill />
            </span>
            <span className="ve-soon">Video coming soon — watch on YouTube</span>
          </a>
        )}

        {isRealVideo && (
          <button
            className={`ve-fs${isFs ? " on" : ""}`}
            onClick={toggleFullscreen}
            aria-label={isFs ? "Exit fullscreen" : "Watch fullscreen"}
            title={isFs ? "Exit fullscreen" : "Watch fullscreen"}
          >
            <Icon name={isFs ? "minimize" : "maximize"} size={15} />
            <span>{isFs ? "Exit" : "Fullscreen"}</span>
          </button>
        )}
      </div>
      <figcaption>
        <b>{video.title}</b>
        <small>
          {video.topic} · {video.level} · {video.duration}
        </small>
        {isRealVideo && (
          <a className="ve-yt-link" href={video.yt} target="_blank" rel="noreferrer">
            <Icon name="youtube" size={14} fill /> Watch on YouTube
          </a>
        )}
      </figcaption>
    </figure>
  );
}
