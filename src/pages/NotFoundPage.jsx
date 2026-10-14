import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";

export default function NotFoundPage() {
  return (
    <section className="page">
      <div className="wrap">
        <div className="empty tall">
          <span className="nf-code">404</span>
          <h3>This page took an unscheduled break.</h3>
          <p>
            The link may be outdated. The videos, courses and projects are all
            still here.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" to="/">
              <Icon name="home" size={16} /> Back home
            </Link>
            <Link className="btn btn-ghost" to="/courses">
              Browse courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
