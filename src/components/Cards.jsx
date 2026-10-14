import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { viewsLabel, formatDate } from "../utils/format";

// Video card with a CSS-gradient thumbnail (no binary assets needed).
export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      <a
        className={`v-thumb ${video.grad}`}
        href={video.yt}
        target="_blank"
        rel="noreferrer"
        aria-label={`Watch ${video.title} on YouTube`}
      >
        <span className="v-play">
          <Icon name="play" size={20} fill />
        </span>
        <span className="v-dur">{video.duration}</span>
        {video.badge && <span className="v-badge">{video.badge}</span>}
      </a>
      <div className="v-body">
        <span className="v-cat">
          {video.topic} <i>·</i> {video.level}
        </span>
        <h3>
          <a href={video.yt} target="_blank" rel="noreferrer">
            {video.title}
          </a>
        </h3>
        <div className="v-meta">
          <span>
            <Icon name="clock" size={13} /> {video.duration}
          </span>
          <span>{viewsLabel(video.views)}</span>
          <span>{formatDate(video.date)}</span>
        </div>
      </div>
    </article>
  );
}

// Compact variant for the homepage ticker row.
export function VideoCardSlim({ video }) {
  return (
    <a className="video-card slim" href={video.yt} target="_blank" rel="noreferrer">
      <span className={`v-thumb ${video.grad}`}>
        <span className="v-play">
          <Icon name="play" size={18} fill />
        </span>
        <span className="v-dur">{video.duration}</span>
      </span>
      <span className="v-body">
        <span className="v-cat">{video.topic}</span>
        <h3>{video.title}</h3>
        <span className="v-meta">
          <span>{viewsLabel(video.views)}</span>
        </span>
      </span>
    </a>
  );
}

// Course card used on /courses and the homepage.
export function CourseCard({ course }) {
  return (
    <Link className="course-card" to={`/courses/${course.id}`}>
      <span className={`cc-thumb ${course.grad}`}>
        <span className="cc-thumb-icon">
          <Icon name="cap" size={44} />
        </span>
        <span className="pill on-thumb">{course.track}</span>
      </span>
      <span className="cc-body">
        <span className="cc-top">
          <span className="pill">{course.level}</span>
          <span className="cc-rating">
            <Icon name="star" size={13} /> {course.rating}
          </span>
        </span>
        <h3>{course.title}</h3>
        <p className="cc-sum">{course.summary}</p>
        <span className="cc-meta">
          <span>
            <Icon name="book" size={13} /> {course.lessons} lessons
          </span>
          <span>
            <Icon name="clock" size={13} /> {course.hours}
          </span>
        </span>
        <span className="cc-foot">
          <span className="cc-price">
            <b>{course.price === 0 ? "Free" : `₹${course.price.toLocaleString("en-IN")}`}</b>
            {course.oldPrice > course.price && (
              <s>₹{course.oldPrice.toLocaleString("en-IN")}</s>
            )}
          </span>
          <span className="btn btn-sm btn-primary">View course</span>
        </span>
      </span>
    </Link>
  );
}

// Project card.
export function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`p-head ${project.grad}`}>
        <span className="pill on-thumb">{project.difficulty}</span>
        <h3>{project.title}</h3>
      </div>
      <div className="p-body">
        <p className="p-sum">{project.summary}</p>
        <div className="p-stack">
          {project.stack.map((s) => (
            <span className="stack-chip" key={s}>
              {s}
            </span>
          ))}
        </div>
        <ul className="tick-list">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="p-links">
          <a className="btn btn-sm btn-ghost" href={project.repo}>
            <Icon name="github" size={15} fill /> Code
          </a>
          <a className="btn btn-sm btn-ghost" href={project.demo}>
            <Icon name="external" size={15} /> Demo
          </a>
        </div>
      </div>
    </article>
  );
}

// AI tool card.
export function ToolCard({ tool }) {
  return (
    <article className="tool-card">
      <span className={`t-logo ${tool.grad}`}>{tool.initials}</span>
      <div className="t-head">
        <h3>{tool.name}</h3>
        <span className={`pill tone-${tool.pricing.toLowerCase()}`}>{tool.pricing}</span>
      </div>
      <p className="t-sum">{tool.summary}</p>
      <div className="t-foot">
        <span className="t-cat">
          <Icon name="layers" size={13} /> {tool.category}
        </span>
        <a className="t-link" href={tool.url} target="_blank" rel="noreferrer">
          Visit <Icon name="arrowRight" size={14} />
        </a>
      </div>
    </article>
  );
}

// Prompt card with copy-to-clipboard.
export function PromptCard({ prompt, onCopy }) {
  return (
    <article className="prompt-card">
      <div className="pr-head">
        <div>
          <span className="pill blue">{prompt.category}</span>
          <h3>{prompt.title}</h3>
        </div>
        <button
          className="btn btn-sm btn-ghost pr-copy"
          onClick={() => onCopy(prompt)}
          aria-label={`Copy prompt: ${prompt.title}`}
        >
          <Icon name="copy" size={15} /> Copy
        </button>
      </div>
      <p className="pr-text">{prompt.text}</p>
      <div className="pr-tags">
        {prompt.tags.map((t) => (
          <span key={t}>#{t}</span>
        ))}
      </div>
    </article>
  );
}
