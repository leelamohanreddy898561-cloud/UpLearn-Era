import { useParams, Link } from "react-router-dom";

import { Icon } from "../components/Icon";
import { Crumbs, Empty } from "../components/ui";
import { getCourse, COURSES } from "../data/courses";
import { SITE } from "../data/site";
import { priceLabel } from "../utils/format";

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = getCourse(id);

  if (!course) {
    return (
      <section className="page">
        <div className="wrap">
          <Empty
            title="Course not found"
            text="The link may be outdated."
            action={
              <Link className="btn btn-primary" to="/courses">
                Back to courses
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  const related = COURSES.filter((c) => c.id !== course.id).slice(0, 3);

  return (
    <section className="page">
      <div className="wrap">
        <Crumbs current={course.title} />

        <div className="cd">
          <div className="cd-main">
            <div className="cd-top">
              <span className="pill">{course.track}</span>
              <span className="pill blue">{course.level}</span>
              {course.tag && <span className="pill brand">{course.tag}</span>}
            </div>
            <h1 className="cd-title">{course.title}</h1>
            <p className="cd-sub">{course.summary}</p>

            <div className="cd-facts">
              <div>
                <Icon name="book" size={17} />
                <b>{course.lessons}</b>
                <span>lessons</span>
              </div>
              <div>
                <Icon name="clock" size={17} />
                <b>{course.hours}</b>
                <span>of video</span>
              </div>
              <div>
                <Icon name="signal" size={17} />
                <b>{course.level}</b>
                <span>difficulty</span>
              </div>
              <div>
                <Icon name="users" size={17} />
                <b>{course.learners}</b>
                <span>learners</span>
              </div>
            </div>

            <h2 className="cd-h3">What you'll be able to do</h2>
            <ul className="tick-list">
              {course.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>

            <h2 className="cd-h3">Curriculum</h2>
            <div className="curriculum">
              {course.curriculum.map((m, i) => (
                <details className="acc" key={m.module} open={i === 0}>
                  <summary>
                    <span className="acc-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="acc-m">{m.module}</span>
                    <span className="acc-c">{m.items.length} lessons</span>
                    <Icon name="chevron" size={16} className="acc-chev" />
                  </summary>
                  <ul className="tick-list">
                    {m.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          <aside className="cd-side">
            <div className="box">
              <span className="box-label">This course</span>
              <div className="box-price-row">
                <b className="box-price">{priceLabel(course.price)}</b>
                {course.oldPrice > course.price && (
                  <s className="box-old">₹{course.oldPrice.toLocaleString("en-IN")}</s>
                )}
              </div>
              {course.oldPrice > course.price && (
                <p className="box-note">
                  Launch price — save ₹
                  {(course.oldPrice - course.price).toLocaleString("en-IN")}
                </p>
              )}
              <a className="btn btn-primary block" href={SITE.youtube} target="_blank" rel="noreferrer">
                {course.price === 0 ? "Start free" : "Enrol now"}
              </a>
              <Link className="btn btn-ghost block" to="/videos">
                Watch free lessons first
              </Link>
              <ul className="box-list">
                <li>
                  <Icon name="check" size={14} /> Lifetime access
                </li>
                <li>
                  <Icon name="check" size={14} /> Source code included
                </li>
                <li>
                  <Icon name="check" size={14} /> Project + report guide
                </li>
                <li>
                  <Icon name="check" size={14} /> Doubt replies on YouTube
                </li>
              </ul>
            </div>

            <div className="box">
              <span className="box-label">Other tracks</span>
              {related.map((c) => (
                <Link className="rel" to={`/courses/${c.id}`} key={c.id}>
                  <b>{c.title}</b>
                  <small>
                    {c.level} · {priceLabel(c.price)}
                  </small>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
