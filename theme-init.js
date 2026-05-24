/**
 * next-themes-compatible bootstrap (class strategy, localStorage key "theme").
 * Runs synchronously before paint to avoid flash of wrong theme.
 */
(function () {
  var storageKey = "theme";
  var stored = localStorage.getItem(storageKey);
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var isDark =
    stored === "dark" ||
    (stored === "light" ? false : stored === "system" ? prefersDark : false);
  document.documentElement.classList.toggle("dark", isDark);
})();
