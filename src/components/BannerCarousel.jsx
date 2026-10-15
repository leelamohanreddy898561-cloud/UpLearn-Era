import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Icon } from "./Icon";
import BrandWordmark from "./BrandWordmark";
import { COURSES } from "../data/courses";
import { SITE } from "../data/site";
import { priceLabel } from "../utils/format";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Auto-scrolling banner carousel (scroll-snap based, no libraries).
// Shows the channel banner first, then one slide per course.
export default function BannerCarousel() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = [
    {
      key: "brand",
      brand: true,
      bg: "/banner.jpg",
      title: "Learn AI, ML & Python by building",
      sub: SITE.tagline,
      cta: { label: "Subscribe on YouTube", href: SITE.youtube },
      cta2: { label: "Explore courses", to: "/courses" },
    },
    ...COURSES.map((c) => ({
      key: c.id,
      course: c,
      title: c.title,
      sub: c.summary,
      cta: { label: "View course", to: `/courses/${c.id}` },
    })),
  ];

  const slideWidth = useCallback(() => {
    const el = trackRef.current?.querySelector(".banner-slide");
    return el ? el.offsetWidth : 1;
  }, []);

  const goTo = useCallback(
    (n) => {
      const track = trackRef.current;
      if (!track) return;
      const total = slides.length;
      const next = ((n % total) + total) % total;
      track.scrollTo({ left: next * slideWidth(), behavior: "smooth" });
      setIndex(next);
    },
    [slides.length, slideWidth]
  );

  // keep the dots in sync when the visitor swipes/scrolls manually
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const w = slideWidth();
      if (w > 1) setIndex(Math.round(track.scrollLeft / w) % slides.length);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slideWidth, slides.length]);

  // gentle autoplay, paused on hover/focus/touch or reduced-motion
  useEffect(() => {
    if (paused || prefersReduced()) return;
    const id = setInterval(() => goTo(index + 1), 4800);
    return () => clearInterval(id);
  }, [paused, index, goTo]);

  const stop = () => setPaused(true);

  return (
    <section
      className="banner-carousel"
      aria-label="Featured banners"
      onMouseEnter={stop}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={stop}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={stop}
    >
      <div className="banner-track" ref={trackRef}>
        {slides.map((s, n) => (
          <article
            className={`banner-slide${s.brand ? " brand" : ""} ${
              s.course ? s.course.grad : ""
            }`}
            key={s.key}
            aria-roledescription="slide"
            aria-label={`${n + 1} of ${slides.length}`}
          >
            {s.brand ? (
              <>
                <img className="banner-photo" src="/hero-photo.jpg" alt="" />
                <div className="banner-content">
                  <span className="eyebrow dark">Welcome to</span>
                  <h1 className="banner-brand-title">
                    <BrandWordmark className="wm-hero" />
                  </h1>
                  <p>{s.title}</p>
                  <div className="banner-actions">
                    <a
                      className="btn btn-primary"
                      href={s.cta.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="youtube" size={16} fill /> {s.cta.label}
                    </a>
                    <Link className="btn btn-outline-white" to={s.cta2.to}>
                      {s.cta2.label}
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="banner-content">
                <span className="pill on-thumb">
                  {s.course.track} · {s.course.level}
                </span>
                <h2>{s.title}</h2>
                <p>{s.sub}</p>
                <div className="banner-actions">
                  <Link className="btn btn-white" to={s.cta.to}>
                    {s.cta.label}
                  </Link>
                  <span className="banner-price">
                    <b>{priceLabel(s.course.price)}</b>
                    {s.course.oldPrice > s.course.price && (
                      <s>₹{s.course.oldPrice.toLocaleString("en-IN")}</s>
                    )}
                  </span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <button
        className="car-arrow prev"
        onClick={() => goTo(index - 1)}
        aria-label="Previous banner"
      >
        <Icon name="chevron" size={20} />
      </button>
      <button
        className="car-arrow next"
        onClick={() => goTo(index + 1)}
        aria-label="Next banner"
      >
        <Icon name="chevron" size={20} />
      </button>

      <div className="car-dots" role="tablist" aria-label="Banner navigation">
        {slides.map((s, n) => (
          <button
            key={s.key}
            className={`car-dot${n === index ? " on" : ""}`}
            onClick={() => goTo(n)}
            aria-label={`Go to banner ${n + 1}`}
            aria-selected={n === index}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
