// UpLearn Era brand wordmark — matches the channel logo exactly:
// UPLEARN (navy, all caps) + ERA (E orange, RA green).
// Use `onDark` when the wordmark sits on a dark navy surface.

export default function BrandWordmark({ onDark = false, className = "" }) {
  return (
    <span
      className={`brand-wordmark${onDark ? " on-dark" : ""}${
        className ? " " + className : ""
      }`}
    >
      <span className="bw-uplearn">UPLEARN</span>{" "}
      <span className="bw-era">
        <span className="bw-e">E</span>
        <span className="bw-ra">RA</span>
      </span>
    </span>
  );
}
