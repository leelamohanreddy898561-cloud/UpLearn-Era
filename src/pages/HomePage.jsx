import { Link } from "react-router-dom";

import { Icon } from "../components/Icon";
import BannerCarousel from "../components/BannerCarousel";
import ScrollingRow from "../components/ScrollingRow";
import VideoEmbed from "../components/VideoEmbed";
import { VideoCardSlim } from "../components/Cards";
import { NAV_GROUPS, SITE } from "../data/site";
import { COURSES } from "../data/courses";
import { VIDEOS } from "../data/videos";

const BROWSE = NAV_GROUPS.flatMap((g) => g.items).filter(
  (i) => i.to !== "/"
);

export default function HomePage() {
  const featured = COURSES.slice(0, 4);
  const freeClasses = VIDEOS.slice(0, 4);

  return (
    <>
      {/* --------------------------- BANNER CAROUSEL ------------------------ */}
      <BannerCarousel />

      {/* ------------------------------- BROWSE ---------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="ref-head">
            <h2>Browse</h2>
            <p>Everything on UpLearn Era, one tap away.</p>
          </div>
          <div className="browse-grid">
            {BROWSE.map((item) => (
              <Link className="browse-card" to={item.to} key={item.to}>
                <span className="browse-icon">
                  <Icon name={item.icon} size={26} />
                </span>
                <b>{item.label}</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ FEATURED --------------------------- */}
      <section className="section grey">
        <div className="wrap">
          <div className="ref-head">
            <h2>Featured</h2>
            <p>Courses students are taking right now.</p>
            <Link className="see-all" to="/courses">
              See all courses <Icon name="arrowRight" size={15} />
            </Link>
          </div>
          <ScrollingRow duration={50} label="Featured courses, scrolling">
            {featured.concat(featured).map((c, n) => (
              <Link className="course-card slim" to={`/courses/${c.id}`} key={`${c.id}-${n}`}>
                <span className={`cc-thumb ${c.grad}`}>
                  <span className="pill on-thumb">{c.track}</span>
                </span>
                <span className="cc-body">
                  <b className="cc-slim-title">{c.title}</b>
                  <small className="cc-slim-sum">{c.summary}</small>
                  <span className="cc-foot">
                    <span className="cc-price">
                      <b>{c.price === 0 ? "Free" : `₹${c.price.toLocaleString("en-IN")}`}</b>
                      {c.oldPrice > c.price && <s>₹{c.oldPrice.toLocaleString("en-IN")}</s>}
                    </span>
                    <span className="cc-link">View Details</span>
                  </span>
                </span>
              </Link>
            ))}
          </ScrollingRow>
        </div>
      </section>

      {/* -------------------------- WATCH FREE CLASSES -------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="free-head">
            <h2>Watch Free Classes</h2>
            <span className="free-underline" aria-hidden="true" />
          </div>
          <div className="video-embed-grid">
            {freeClasses.map((v) => (
              <VideoEmbed video={v} key={v.id} />
            ))}
          </div>
          <div className="center">
            <Link className="btn btn-outline-orange" to="/videos">
              See All Videos <Icon name="arrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------- VIDEO TICKER ------------------------ */}
      <section className="section grey">
        <div className="wrap">
          <div className="ref-head">
            <h2>Latest on YouTube</h2>
            <p>New tutorials, tools walkthroughs and project demos.</p>
            <Link className="see-all" to="/videos">
              Open video library <Icon name="arrowRight" size={15} />
            </Link>
          </div>
          <ScrollingRow duration={38} label="Latest videos, scrolling">
            {VIDEOS.concat(VIDEOS).map((v, n) => (
              <VideoCardSlim video={v} key={`${v.id}-${n}`} />
            ))}
          </ScrollingRow>
          <p className="scroll-hint">
            Subscribe on YouTube and never miss an upload.
          </p>
        </div>
      </section>

      {/* ------------------------------ ABOUT US -------------------------- */}
      <section className="section">
        <div className="wrap">
          <div className="about-strip">
            <h2>ABOUT US</h2>
            <p>{SITE.description}</p>
            <div className="banner-actions center">
              <a className="btn btn-primary" href={SITE.youtube} target="_blank" rel="noreferrer">
                <Icon name="youtube" size={16} fill /> Subscribe on YouTube
              </a>
              <Link className="btn btn-ghost" to="/about">
                Read our story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
