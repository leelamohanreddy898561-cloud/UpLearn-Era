import { Icon } from "./Icon";

// YouTube video embed. Real channel videos render an iframe; placeholders
// show a gradient card until their URL is added.
export default function VideoEmbed({ video }) {
  const isRealVideo = /youtube\.com\/watch\?v=|youtu\.be\//.test(video.yt || "");
  const embedSrc = isRealVideo
    ? `https://www.youtube.com/embed/${video.yt.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1]}`
    : null;

  return (
    <figure className="video-embed">
      <div className={`ve-frame ${video.grad}`}>
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
