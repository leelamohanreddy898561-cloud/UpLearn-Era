import { Link } from "react-router-dom";

import { Icon } from "../components/Icon";
import { SectionHead } from "../components/ui";
import { STATS, SITE } from "../data/site";
import { COURSES } from "../data/courses";

const VALUES = [
  {
    icon: "code",
    title: "Build, don't just watch",
    text: "Every video ends with something running. No passive tutorials, no 40-minute setups with zero output.",
  },
  {
    icon: "layers",
    title: "Fundamentals first",
    text: "Tools change every year. Mathematics, data structures and clean code compound forever.",
  },
  {
    icon: "users",
    title: "Free where it counts",
    text: "The core library stays free on YouTube. Paid courses exist for structure, code and doubt support.",
  },
];

const TIMELINE = [
  { when: "2025", what: "UpLearn Era starts as a YouTube channel for B.Tech students learning AI." },
  { when: "2025", what: "First project series — attendance system, notes digitizer, resume screener." },
  { when: "2026", what: "Courses, prompt library and this site launch — everything in one place." },
  { when: "Next", what: "Live cohorts, interview prep tracks, and your project on the wall." },
];

export default function AboutPage() {
  return (
    <section className="page">
      <div className="wrap">
        <div className="page-head">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <b>About</b>
          </nav>
          <h1 className="page-title">We make AI practical for B.Tech students.</h1>
          <p className="page-sub">
            UpLearn Era exists because most students learn AI the hard way —
            scattered blogs, outdated playlists and projects that never run.
            We fix that with one rule: if you can't build it after watching,
            the video isn't done.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-story">
            <img
              className="about-banner"
              src="/banner.jpg"
              alt="UpLearn Era channel banner"
              loading="lazy"
            />
            <h2>The short story</h2>
            <p>
              UpLearn Era began in {SITE.since} as a simple YouTube channel —
              one student explaining AI to other students, in the same language
              a classroom would use. No gatekeeping, no "you need a PhD for
              this". Just clear fundamentals and working code.
            </p>
            <p>
              Today the channel has grown into a full learning hub:{" "}
              {COURSES.length} structured courses, 60+ free videos, an AI tools
              directory and a prompt library — everything tuned for the
              assignments, mini-projects and final-year reviews that actually
              decide your grades.
            </p>
            <p>
              Everything on this site is data-driven, so every course, video,
              project and prompt you see is editable in one file. If you spot
              something outdated, tell us — it gets fixed fast.
            </p>
            <div className="about-cta">
              <a className="btn btn-primary" href={SITE.youtube} target="_blank" rel="noreferrer">
                <Icon name="youtube" size={16} fill /> Watch the channel
              </a>
              <Link className="btn btn-ghost" to="/contact">
                <Icon name="mail" size={16} /> Get in touch
              </Link>
            </div>
          </div>

          <aside className="about-side">
            <div className="box">
              <span className="box-label">UpLearn Era at a glance</span>
              <div className="glance">
                {STATS.map((s) => (
                  <div className="glance-item" key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="box">
              <span className="box-label">Where we are</span>
              <p className="box-note">
                <Icon name="pin" size={14} /> {SITE.location}
                <br />
                <Icon name="mail" size={14} /> {SITE.email}
              </p>
              <a className="btn btn-ghost block" href={`mailto:${SITE.email}`}>
                Email us
              </a>
            </div>
          </aside>
        </div>

        <section className="section-tight">
          <SectionHead tag="What we believe" title="Three rules we don't break" />
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <span className="value-icon">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-tight">
          <SectionHead tag="Journey" title="How we got here" />
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className="tl-row" key={t.what}>
                <span className="tl-dot" aria-hidden="true" />
                <div>
                  <b>{t.when}</b>
                  <p>{t.what}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="wrap cta-in">
            <h2>Learn with us — it's free to start.</h2>
            <p>Pick a course, or just hit play on the latest video.</p>
            <div className="cta-actions">
              <Link className="btn btn-white" to="/courses">
                Browse courses
              </Link>
              <Link className="btn btn-outline-white" to="/videos">
                Open video library
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
