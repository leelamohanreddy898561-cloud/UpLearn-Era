// YouTube video embed. Falls back to a link-card until a real video URL
// exists in the data (channel currently has no uploads).

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
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="ve-soon">Video coming soon — watch on YouTube</span>
          </a>
        )}
      </div>
      <figcaption>
        <b>{video.title}</b>
        <small>
          {video.topic} · {video.level}
        </small>
      </figcaption>
    </figure>
  );
}
