import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Icon } from "./Icon";
import { embedUrl, THUMB_QUALITIES, thumbUrl, videoIdFrom } from "../utils/youtube";

// Video card, matching the reference channel's "Free Courses" setup:
// the listing only ever shows the thumbnail — the YouTube player (iframe)
// is created on demand inside a popup when the viewer clicks.
export default function VideoEmbed({ video }) {
  const videoId = videoIdFrom(video.yt);
  const [quality, setQuality] = useState(0);
  const [open, setOpen] = useState(false);

  // Esc closes the player; background scroll is locked while it is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nextThumb = () =>
    setQuality((q) => (q < THUMB_QUALITIES.length - 1 ? q + 1 : q));

  return (
    <>
      <figure className="video-embed">
        <button
          type="button"
          className={`ve-face ${video.grad}`}
          onClick={() => setOpen(true)}
          aria-label={`Play video: ${video.title}`}
        >
          <img
            src={thumbUrl(videoId, THUMB_QUALITIES[quality])}
            alt=""
            loading="lazy"
            onError={nextThumb}
          />
          <span className="ve-shade" aria-hidden="true" />
          <span className="ve-play" aria-hidden="true">
            <Icon name="play" size={22} fill />
          </span>
          <span className="ve-dur" aria-hidden="true">
            {video.duration}
          </span>
        </button>
        <figcaption>
          <b>{video.title}</b>
          <small>
            {video.topic} · {video.level} · {video.duration}
          </small>
        </figcaption>
      </figure>

      {open &&
        createPortal(
          <div
            className="ve-modal"
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            onClick={() => setOpen(false)}
          >
            <div className="ve-modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="ve-modal-close"
                onClick={() => setOpen(false)}
                aria-label="Close video"
              >
                <Icon name="close" size={18} />
              </button>
              <div className="ve-modal-frame">
                <iframe
                  src={embedUrl(videoId)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}