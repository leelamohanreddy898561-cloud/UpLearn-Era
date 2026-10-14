// Small formatting helpers shared across pages.

export function priceLabel(n) {
  return n === 0 ? "Free" : "₹" + n.toLocaleString("en-IN");
}

export function viewsLabel(n) {
  if (n >= 1000) {
    const k = n / 1000;
    return (k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")) + "K views";
  }
  return n + " views";
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export function dateShort(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
