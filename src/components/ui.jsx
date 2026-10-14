// Small shared UI pieces used across pages.

export function SectionHead({ tag, title, sub, action }) {
  return (
    <div className="sec-head">
      <div>
        {tag && <span className="eyebrow">{tag}</span>}
        <h2>{title}</h2>
        {sub && <p className="sec-sub">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Pill({ children, tone = "brand" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

export function Empty({ title, text, action }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}

export function Crumbs({ current }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      <b>{current}</b>
    </nav>
  );
}

export function PageHead({ current, title, sub, children }) {
  return (
    <div className="page-head">
      <Crumbs current={current} />
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
      {children}
    </div>
  );
}
