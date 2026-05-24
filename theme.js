/**
 * Theme helpers aligned with next-themes (class on <html>, storage key "theme").
 * Used by script.js after DOMContentLoaded.
 */
const THEME_STORAGE_KEY = "theme";

function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY);
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Resolved theme used for UI (never "system"). */
function getResolvedTheme() {
  const stored = getStoredTheme();
  if (stored === "light" || stored === "dark") return stored;
  if (stored === "system") return getSystemTheme();
  return "light";
}

function applyTheme(theme) {
  const resolved =
    theme === "system"
      ? getSystemTheme()
      : theme === "light" || theme === "dark"
        ? theme
        : getResolvedTheme();
  document.documentElement.classList.toggle("dark", resolved === "dark");
  syncThemeToggleButton(resolved);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.content = resolved === "dark" ? "#020617" : "#f8fafc";
  }
  return resolved;
}

function setTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  return applyTheme(theme);
}

function toggleTheme() {
  const next = getResolvedTheme() === "dark" ? "light" : "dark";
  return setTheme(next);
}

function syncThemeToggleButton(resolved) {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  const isDark = resolved === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  btn.setAttribute("aria-label", label);
  btn.setAttribute("title", isDark ? "Light mode" : "Dark mode");
}

function initThemeToggle() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  syncThemeToggleButton(getResolvedTheme());
  btn.addEventListener("click", () => toggleTheme());
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (getStoredTheme() === "system") applyTheme("system");
    });
}

function getShareCaptureBackground() {
  return getResolvedTheme() === "dark" ? "#020617" : "#f8fafc";
}
