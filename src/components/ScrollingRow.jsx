// Horizontal auto-scrolling row (news-ticker style). Pauses on hover/focus
// and falls back to a plain scrollable row when reduced motion is requested.

export default function ScrollingRow({ duration = 40, label, children }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const set = <div className="scroller-set">{children}</div>;

  return (
    <div
      className={`scroller${reduce ? " static" : ""}`}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <div
        className="scroller-track"
        style={reduce ? undefined : { animationDuration: `${duration}s` }}
      >
        {set}
        {!reduce && set}
      </div>
    </div>
  );
}
