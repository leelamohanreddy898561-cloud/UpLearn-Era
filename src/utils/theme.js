// Theme switching: remember the visitor's choice in localStorage, and fall
// back to their operating-system setting the first time they visit.
const KEY = "uplearn-theme";

export function readTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // localStorage can be blocked (private mode) — fall through to the OS check
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // not being able to save it only costs us persistence, not correctness
  }
}
