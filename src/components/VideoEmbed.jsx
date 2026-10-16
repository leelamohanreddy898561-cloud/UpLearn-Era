// YouTube video embed for the real channel videos listed in data/videos.js.
export default function VideoEmbed({ video }) {
  const videoId = video.yt?.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1] ?? "";

  return (
    <figure className="video-embed">
      <div className={`ve-frame ${video.grad}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <figcaption>
        <b>{video.title}</b>
        <small>
          {video.topic} · {video.level} · {video.duration}
        </small>
      </figcaption>
    </figure>
  );
}