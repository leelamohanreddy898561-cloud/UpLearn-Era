import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

// Load the official YouTube IFrame Player API once — used to know exactly
// when a video is playing, so landscape rotation can auto-fullscreen it.
let apiPromise = null;
function loadYouTubeAPI() {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
  });
  return apiPromise;
}

export default function VideoEmbed({ video }) {
  const isRealVideo = /youtube\.com\/watch\?v=|youtu\.be\//.test(video.yt || "");
  const videoId = isRealVideo
    ? video.yt.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1]
    : null;
  const frameRef = useRef(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [isFs, setIsFs] = useState(false);

  // track device orientation
  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape)");
    const apply = () => setLandscape(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // create a YouTube player for accurate play/pause detection
  useEffect(() => {
    if (!videoId) return;
    let cancelled = false;
    loadYouTubeAPI().then((YT) => {
      if (cancelled || !frameRef.current) return;
      playerRef.current = new YT.Player(`yt-${videoId}`, {
        videoId,
        playerVars: { rel: 0 },
        events: {
          onStateChange: (e) =>
            setPlaying(e.data === YT.PlayerState.PLAYING),
        },
      });
    });
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {
        /* player already gone */
      }
    };
  }, [videoId]);

  // keep the manual fullscreen button in sync
  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
  };

  // auto-fullscreen only while playing AND the phone is rotated to landscape
  const autoFs = playing && landscape;

  return (
    <figure className="video-embed">
      <div
        className={`ve-frame ${video.grad}${autoFs ? " landscape-fs" : ""}`}
        ref={frameRef}
      >
        {videoId ? (
          <div id={`yt-${videoId}`} className="ve-yt" title={video.title} />
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
