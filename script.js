const DEFAULT_LANGUAGE = "en.asad";
const ARABIC_EDITION = "quran-uthmani";
const LANGUAGE_STORAGE_KEY = "currentLang";
const SUPPORTED_LANGUAGE_EDITIONS = [
  "en.asad",
  ARABIC_EDITION,
  "ur.maududi",
  "ms.basmeih",
];
const LANGUAGE_LABELS = {
  "en.asad": "English",
  [ARABIC_EDITION]: "Arabic",
  "ur.maududi": "Urdu",
  "ms.basmeih": "Malay",
};
const WHATS_NEW_APP_VERSION = "1.0.0";
/**
 * App updates — newest first. Bump WHATS_NEW_RELEASE_ID when adding an entry.
 * icon: Material Symbols name; theme: icon badge color (rose | cyan | amber | emerald).
 */
const WHATS_NEW_RELEASES = [
  {
    id: "saved-reflections",
    icon: "favorite",
    theme: "rose",
    copy: {
      en: {
        title: "Saved reflections",
        description:
          "Save up to 5 ayahs with the heart on each verse. Open your list from the heart in the top right.",
      },
      ur: {
        title: "محفوظ آیات",
        description:
          "ہر آیت پر دل کے آئیکون سے زیادہ سے زیادہ ۵ آیات محفوظ کریں۔ اوپر دائیں جانب دل سے اپنی فہرست کھولیں۔",
      },
      ar: {
        title: "الآيات المحفوظة",
        description:
          "احفظ حتى ٥ آيات بأيقونة القلب على كل آية. اعرض قائمتك من القلب أعلى اليمين.",
      },
      ms: {
        title: "Ayat tersimpan",
        description:
          "Simpan sehingga 5 ayat dengan ikon hati pada setiap ayat. Buka senarai dari ikon hati di penjuru kanan atas.",
      },
    },
  },
  {
    id: "smooth-verse-transitions",
    icon: "swipe",
    theme: "cyan",
    copy: {
      en: {
        title: "Smoother transitions",
        description:
          "Fade animations when you swipe, go to next or previous, or change language.",
      },
      ur: {
        title: "نرم منتقل",
        description:
          "سوائپ، اگلی/پچھلی آیت، یا زبان بدلنے پر نرم فیڈ اینیمیشن۔",
      },
      ar: {
        title: "انتقالات أنعم",
        description:
          "تأثيرات انتقال عند التمرير أو التنقل بين الآيات أو تغيير اللغة.",
      },
      ms: {
        title: "Animasi lebih lancar",
        description:
          "Animasi pudar apabila anda leret, ke ayat seterusnya/sebelumnya, atau tukar bahasa.",
      },
    },
  },
  {
    id: "arabic-language",
    icon: "menu_book",
    theme: "amber",
    copy: {
      en: {
        title: "Arabic Quran text",
        description: "Read the Quran in Uthmani script from the Language menu.",
      },
      ur: {
        title: "عربی قرآن",
        description: "لینگویج مینیو سے عربی (رسم عثمانی) پڑھیں۔",
      },
      ar: {
        title: "القرآن بالعربية",
        description: "اقرأ القرآن بالرسم العثماني من قائمة اللغة.",
      },
      ms: {
        title: "Al-Quran Arab",
        description:
          "Baca Al-Quran dalam skrip Uthmani dari menu bahasa.",
      },
    },
  },
  {
    id: "malay-language",
    icon: "translate",
    theme: "emerald",
    copy: {
      en: {
        title: "Malay translation",
        description: "Malay translation (ms.basmeih) is available in the Language menu.",
      },
      ur: {
        title: "مالے ترجمہ",
        description: "لینگویج مینیو میں مالے ترجمہ (ms.basmeih) دستیاب ہے۔",
      },
      ar: {
        title: "الترجمة الملايوية",
        description: "الترجمة الملايوية (ms.basmeih) متوفرة في قائمة اللغة.",
      },
      ms: {
        title: "Terjemahan Melayu",
        description:
          "Terjemahan Melayu (ms.basmeih) tersedia dalam menu bahasa.",
      },
    },
  },
];
const WHATS_NEW_RELEASE_ID = WHATS_NEW_RELEASES[0].id;
const WHATS_NEW_STORAGE_KEY = `ayahday-whats-new-dismissed-${WHATS_NEW_APP_VERSION}-${WHATS_NEW_RELEASE_ID}`;
const SAVED_AYAHS_STORAGE_KEY = "ayahday-saved-ayahs";
const MAX_SAVED_AYAHS = 5;
const SAVE_TOAST_MS = 3500;

let currentLang = normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
let currentAyahNumber = getRandomAyahNumber();
let currentSurahNumber = null;
let currentAyahInSurah = null;
let ayahHistory = [];
let touchstartX = 0;
let touchendX = 0;
const minSwipeDistance = 30;
let nextAyahData = null;

const API_CONFIG = {
  url: "https://api.alquran.cloud/v1/ayah",
};

const SHARE_APP_URL = "https://www.ayahday.cc/";
const SHARE_SNAPSHOT_FOOTER =
  "AyahDay.cc - Daily Quranic verses in Multiple Languages";

const SHARE_TOOLTIP_MS = 3000;
let shareTooltipHideTimer = null;
let shareSnapshotInProgress = false;

const BOOT_OVERLAY_FALLBACK_MS = 3000;
const VERSE_FADE_MS = 420;
let bootOverlayFallbackTimer = null;
let saveToastHideTimer = null;
let verseTransitionLock = false;

document.addEventListener("DOMContentLoaded", async () => {
  scheduleBootOverlayFallback();
  try {
    initLanguageSelect();
    initUpdatesModal();
    const bootData = await fetchAyah(currentAyahNumber);
    if (bootData) {
      applyVerseData(bootData);
      const verseContent = document.getElementById("verseContent");
      const footer = document.getElementById("versePanelFooter");
      verseContent?.classList.add("verse-fade-in");
      footer?.classList.add("verse-fade-in");
      await sleep(VERSE_FADE_MS);
      verseContent?.classList.remove("verse-fade-in");
      footer?.classList.remove("verse-fade-in");
    }
    nextAyahData = await fetchAyah(getRandomAyahNumber());
    addEventListeners();
    initSavedAyahs();
    initShareTooltip();
    updateLanguageDisplay();
  } catch (err) {
    console.error("AyahDay boot failed:", err);
  } finally {
    revealBootOverlay();
  }
});

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setVerseTransitioning(active) {
  document
    .getElementById("verseDisplay")
    ?.classList.toggle("is-transitioning", active);
}

async function runVerseTransition(updateFn, { fadeOut = true } = {}) {
  if (verseTransitionLock) return;
  const verseDisplay = document.getElementById("verseDisplay");
  const verseContent = document.getElementById("verseContent");
  const footer = document.getElementById("versePanelFooter");

  if (!verseContent || prefersReducedMotion()) {
    verseDisplay?.classList.remove("swipe-left", "swipe-right");
    await updateFn();
    return;
  }

  verseTransitionLock = true;
  setVerseTransitioning(true);
  try {
    if (fadeOut) {
      verseContent.classList.add("verse-fade-out");
      footer?.classList.add("verse-fade-out");
      await sleep(VERSE_FADE_MS);
    }

    verseDisplay?.classList.remove("swipe-left", "swipe-right");

    await updateFn();

    verseContent.classList.remove("verse-fade-out");
    footer?.classList.remove("verse-fade-out");
    verseContent.classList.add("verse-fade-in");
    footer?.classList.add("verse-fade-in");
    await sleep(VERSE_FADE_MS);
    verseContent.classList.remove("verse-fade-in");
    footer?.classList.remove("verse-fade-in");
  } finally {
    verseTransitionLock = false;
    setVerseTransitioning(false);
  }
}

async function fetchAndDisplayAyah(ayahNumber, { fadeOut = true } = {}) {
  await runVerseTransition(
    async () => {
      const data = await fetchAyah(ayahNumber);
      if (data) applyVerseData(data);
    },
    { fadeOut },
  );
}

function surahFromAyahPayload(payload) {
  return {
    name: payload.data.surah.name,
    englishName: payload.data.surah.englishName,
    englishNameTranslation: payload.data.surah.englishNameTranslation,
    revelationType: payload.data.surah.revelationType,
  };
}

function isArabicEdition(lang = currentLang) {
  return lang === ARABIC_EDITION;
}

function isUrduEdition(lang = currentLang) {
  return lang === "ur.maududi";
}

function isRtlEdition(lang = currentLang) {
  return isUrduEdition(lang) || isArabicEdition(lang);
}

/** @param {number|string} ayahRef Global ayah number (1–6236) or surah:ayah (e.g. "2:255"). */
function verseDataFromArabicPayload(arabicPayload, text) {
  const meta = arabicPayload.data;
  return {
    data: {
      text,
      surah: surahFromAyahPayload(arabicPayload),
      globalNumber: meta.number,
      surahNumber: meta.surah.number,
      ayahInSurah: meta.numberInSurah,
    },
  };
}

async function fetchAyah(ayahRef) {
  try {
    if (isArabicEdition()) {
      const response = await fetch(
        `${API_CONFIG.url}/${ayahRef}/${ARABIC_EDITION}`,
      );
      if (!response.ok) throw new Error("Failed to fetch Ayah");
      const payload = await response.json();
      return verseDataFromArabicPayload(payload, payload.data.text);
    }

    const arabicResponse = await fetch(
      `${API_CONFIG.url}/${ayahRef}/${ARABIC_EDITION}`,
    );

    const translationResponse = await fetch(
      `${API_CONFIG.url}/${ayahRef}/${currentLang}`,
    );

    if (!arabicResponse.ok || !translationResponse.ok)
      throw new Error("Failed to fetch Ayah");

    const arabicData = await arabicResponse.json();
    const translationData = await translationResponse.json();

    return verseDataFromArabicPayload(arabicData, translationData.data.text);
  } catch (error) {
    console.error("Error fetching verse:", error);
    displayError("Error fetching verse. Please try again later.");
    return null;
  }
}

function applyVerseData(data) {
  if (!data) return;
  const verseText = data.data.text;
  const surahInfo = data.data.surah;
  const surahDetails = `${surahInfo.name} (${surahInfo.englishName}, ${surahInfo.englishNameTranslation})<br>${surahInfo.revelationType}`;
  const verseDisplay = document.getElementById("verseDisplay");

  currentAyahNumber = data.data.globalNumber;
  currentSurahNumber = data.data.surahNumber;
  currentAyahInSurah = data.data.ayahInSurah;
  verseDisplay.dataset.surahShareArabic = surahInfo.name;
  verseDisplay.dataset.surahNumber = String(currentSurahNumber);
  verseDisplay.dataset.ayahInSurah = String(currentAyahInSurah);

  const verseContent = document.getElementById("verseContent");
  const surahMeta = document.getElementById("surahMeta");
  if (verseContent) {
    verseContent.innerHTML = `<p class="verse">${verseText}</p><div class="verse-surah-divider" aria-hidden="true"></div>`;
  }
  if (surahMeta) {
    surahMeta.innerHTML = surahDetails;
  }
  setSaveAyahUiVisible(true);
  updateSaveHeartState();
}

async function displayVerse(data, options = {}) {
  const { fadeOut = true } = options;
  if (!data) return;
  if (prefersReducedMotion()) {
    applyVerseData(data);
    return;
  }
  await runVerseTransition(() => applyVerseData(data), { fadeOut });
}

function scheduleBootOverlayFallback() {
  clearBootOverlayFallback();
  bootOverlayFallbackTimer = setTimeout(() => {
    bootOverlayFallbackTimer = null;
    revealBootOverlay();
  }, BOOT_OVERLAY_FALLBACK_MS);
}

function clearBootOverlayFallback() {
  if (bootOverlayFallbackTimer != null) {
    clearTimeout(bootOverlayFallbackTimer);
    bootOverlayFallbackTimer = null;
  }
}

function revealBootOverlay() {
  const overlay = document.getElementById("appBootOverlay");
  clearBootOverlayFallback();
  if (!overlay || overlay.dataset.revealed === "1") return;
  overlay.dataset.revealed = "1";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add("app-boot-overlay--hide");
      overlay.setAttribute("aria-busy", "false");
      setTimeout(() => overlay.remove(), 560);
    });
  });
}

function getRandomAyahNumber() {
  return Math.floor(Math.random() * 6236) + 1;
}

function addEventListeners() {
  document
    .getElementById("shareBtn")
    .addEventListener("click", openSharePreview);
  const sharePreviewClose = document.getElementById("sharePreviewClose");
  const sharePreviewBackdrop = document.getElementById("sharePreviewBackdrop");
  const sharePreviewConfirm = document.getElementById("sharePreviewConfirm");
  if (sharePreviewClose) {
    sharePreviewClose.addEventListener("click", closeSharePreview);
  }
  if (sharePreviewBackdrop) {
    sharePreviewBackdrop.addEventListener("click", closeSharePreview);
  }
  if (sharePreviewConfirm) {
    sharePreviewConfirm.addEventListener("click", runShareFromPreview);
  }
  document.getElementById("nextBtn").addEventListener("click", fetchNewVerse);
  const prevBtn = document.getElementById("prevBtn");
  prevBtn.classList.add("disabled");
  prevBtn.addEventListener("click", fetchPrevVerse);
  const languageTrigger = document.getElementById("language-trigger");
  if (languageTrigger) {
    languageTrigger.addEventListener("click", toggleLanguageMenu);
  }
  const languageOptions = document.querySelectorAll(".lang-option");
  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      handleLanguageChange(option.dataset.language);
      closeLanguageMenu();
    });
  });
  document.addEventListener("click", (event) => {
    const languageMenu = document.getElementById("language-menu");
    if (languageMenu && !languageMenu.contains(event.target)) {
      closeLanguageMenu();
    }
    const savedMenu = document.getElementById("saved-menu");
    if (savedMenu && !savedMenu.contains(event.target)) {
      closeSavedMenu();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const shareModal = document.getElementById("sharePreviewModal");
    if (shareModal && !shareModal.hidden) {
      closeSharePreview();
      return;
    }
    closeUpdatesModal();
    closeSavedMenu();
    closeLanguageMenu();
  });
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchend", handleTouchEnd, false);
}

function normalizeLanguage(languageEdition) {
  if (SUPPORTED_LANGUAGE_EDITIONS.includes(languageEdition)) {
    return languageEdition;
  }
  return DEFAULT_LANGUAGE;
}

function initLanguageSelect() {
  const languageMenu = document.getElementById("language-menu");
  if (!languageMenu) return;

  currentLang = normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang);
  syncLanguageMenuUI();
}

function getWhatsNewLocale() {
  if (isArabicEdition()) return "ar";
  if (isUrduEdition()) return "ur";
  if (currentLang === "ms.basmeih") return "ms";
  return "en";
}

function getReleaseCopy(release) {
  const locale = getWhatsNewLocale();
  return release.copy[locale] ?? release.copy.en;
}

function getUpdatesModalChrome() {
  const locale = getWhatsNewLocale();
  const titles = {
    en: "What's New",
    ur: "نیا کیا ہے",
    ar: "ما الجديد",
    ms: "Apa Baharu",
  };
  const closes = {
    en: "Close",
    ur: "بند کریں",
    ar: "إغلاق",
    ms: "Tutup",
  };
  const gotIt = {
    en: "Got it",
    ur: "سمجھ گیا",
    ar: "حسناً",
    ms: "Faham",
  };
  return {
    title: titles[locale],
    close: closes[locale],
    gotIt: gotIt[locale],
  };
}

function hasUnseenUpdates() {
  return localStorage.getItem(WHATS_NEW_STORAGE_KEY) !== "1";
}

function markUpdatesSeen() {
  localStorage.setItem(WHATS_NEW_STORAGE_KEY, "1");
  syncUpdatesBellBadge();
}

function syncUpdatesBellBadge() {
  const bell = document.getElementById("updatesBellBtn");
  if (!bell) return;
  bell.classList.toggle("header-icon-btn--unread", hasUnseenUpdates());
}

function renderUpdatesModalCards() {
  const container = document.getElementById("updatesModalCards");
  const modal = document.getElementById("updatesModal");
  if (!container || !modal) return;

  const rtl = isRtlEdition();
  container.replaceChildren();
  container.setAttribute("dir", rtl ? "rtl" : "ltr");
  if (rtl) {
    container.classList.add("font-urduUi", "leading-8");
  } else {
    container.classList.remove("font-urduUi", "leading-8");
  }

  WHATS_NEW_RELEASES.forEach((release, index) => {
    const { title, description } = getReleaseCopy(release);
    const card = document.createElement("article");
    card.className = `updates-card updates-card--${release.theme}`;
    card.style.animationDelay = `${index * 60}ms`;

    const iconWrap = document.createElement("div");
    iconWrap.className = "updates-card__icon";
    iconWrap.setAttribute("aria-hidden", "true");
    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined";
    icon.textContent = release.icon;
    iconWrap.appendChild(icon);

    const body = document.createElement("div");
    body.className = "updates-card__body";
    const titleEl = document.createElement("h3");
    titleEl.className = "updates-card__title";
    titleEl.textContent = title;
    const descEl = document.createElement("p");
    descEl.className = "updates-card__desc";
    descEl.textContent = description;
    body.append(titleEl, descEl);

    card.append(iconWrap, body);
    container.appendChild(card);
  });
}

function updateUpdatesModalChrome() {
  const chrome = getUpdatesModalChrome();
  const titleEl = document.getElementById("updatesModalTitle");
  const closeBtn = document.getElementById("updatesModalClose");
  const gotItBtn = document.getElementById("updatesModalGotIt");
  const modal = document.getElementById("updatesModal");
  if (titleEl) titleEl.textContent = chrome.title;
  if (closeBtn) {
    closeBtn.setAttribute("aria-label", chrome.close);
    closeBtn.setAttribute("title", chrome.close);
  }
  if (gotItBtn) gotItBtn.textContent = chrome.gotIt;
  if (modal) {
    modal.setAttribute("dir", isRtlEdition() ? "rtl" : "ltr");
    if (isRtlEdition()) {
      modal.classList.add("font-urduUi");
    } else {
      modal.classList.remove("font-urduUi");
    }
    if (!modal.hidden) renderUpdatesModalCards();
  }
}

function openUpdatesModal() {
  const modal = document.getElementById("updatesModal");
  if (!modal || !modal.hidden) return;
  closeSavedMenu();
  closeLanguageMenu();
  updateUpdatesModalChrome();
  renderUpdatesModalCards();
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.getElementById("updatesModalClose")?.focus();
}

function closeUpdatesModal({ markSeen = false } = {}) {
  const modal = document.getElementById("updatesModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  if (markSeen) markUpdatesSeen();
}

function initUpdatesModal() {
  const bell = document.getElementById("updatesBellBtn");
  const closeBtn = document.getElementById("updatesModalClose");
  const gotItBtn = document.getElementById("updatesModalGotIt");
  const backdrop = document.getElementById("updatesModalBackdrop");

  syncUpdatesBellBadge();
  updateUpdatesModalChrome();

  if (bell) {
    bell.addEventListener("click", () => openUpdatesModal());
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeUpdatesModal());
  }
  if (backdrop) {
    backdrop.addEventListener("click", () => closeUpdatesModal());
  }
  if (gotItBtn) {
    gotItBtn.addEventListener("click", () =>
      closeUpdatesModal({ markSeen: true }),
    );
  }
}

function syncLanguageMenuUI() {
  const triggerLabel = document.getElementById("language-trigger-label");
  const normalizedLanguage = normalizeLanguage(currentLang);
  if (triggerLabel) {
    triggerLabel.textContent = LANGUAGE_LABELS[normalizedLanguage] || "English";
  }
  document.querySelectorAll(".lang-option").forEach((option) => {
    const isActive = option.dataset.language === normalizedLanguage;
    option.setAttribute("aria-checked", String(isActive));
    option.dataset.active = String(isActive);
  });
}

function toggleLanguageMenu() {
  const languageMenu = document.getElementById("language-menu");
  const menuContent = document.getElementById("language-menu-content");
  const trigger = document.getElementById("language-trigger");
  if (!languageMenu || !menuContent || !trigger) return;
  const isOpen = languageMenu.dataset.open === "true";
  if (isOpen) {
    closeLanguageMenu();
    return;
  }
  languageMenu.dataset.open = "true";
  menuContent.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
}

function closeLanguageMenu() {
  const languageMenu = document.getElementById("language-menu");
  const menuContent = document.getElementById("language-menu-content");
  const trigger = document.getElementById("language-trigger");
  if (!languageMenu || !menuContent || !trigger) return;
  languageMenu.dataset.open = "false";
  menuContent.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
}

function getShareTooltipEls() {
  return {
    btn: document.getElementById("shareBtn"),
    tip: document.getElementById("shareTooltip"),
    label: document.getElementById("shareTooltipLabel"),
  };
}

function clearShareTooltipTimer() {
  if (shareTooltipHideTimer) {
    clearTimeout(shareTooltipHideTimer);
    shareTooltipHideTimer = null;
  }
}

function closeShareTooltip() {
  const { tip } = getShareTooltipEls();
  clearShareTooltipTimer();
  if (tip) {
    tip.classList.remove("share-tooltip--open");
    tip.style.left = "";
    tip.style.top = "";
  }
}

function positionShareTooltip() {
  const { btn, tip } = getShareTooltipEls();
  if (!btn || !tip || !tip.classList.contains("share-tooltip--open")) return;
  const rect = btn.getBoundingClientRect();
  const pad = 8;
  const gap = 10;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tw = tip.offsetWidth;
  const th = tip.offsetHeight;
  let top = rect.top - th - gap;
  if (top < pad) {
    top = rect.bottom + gap;
  }
  if (top + th > vh - pad) {
    top = Math.max(pad, rect.top - th - gap);
  }
  if (top + th > vh - pad) {
    top = Math.max(pad, vh - th - pad);
  }
  let left = rect.left + rect.width / 2 - tw / 2;
  left = Math.max(pad, Math.min(left, vw - tw - pad));
  tip.style.left = `${Math.round(left)}px`;
  tip.style.top = `${Math.round(top)}px`;
}

function openShareTooltip() {
  const { tip, btn } = getShareTooltipEls();
  if (!tip || !btn) return;
  clearShareTooltipTimer();
  tip.classList.add("share-tooltip--open");
  void tip.offsetHeight;
  positionShareTooltip();
  shareTooltipHideTimer = setTimeout(closeShareTooltip, SHARE_TOOLTIP_MS);
}

function initShareTooltip() {
  const { btn } = getShareTooltipEls();
  if (!btn) return;
  btn.addEventListener("mouseenter", openShareTooltip);
  btn.addEventListener("mouseleave", closeShareTooltip);
  btn.addEventListener("focusin", openShareTooltip);
  btn.addEventListener("focusout", closeShareTooltip);
  window.addEventListener("resize", () => {
    const { tip } = getShareTooltipEls();
    if (tip?.classList.contains("share-tooltip--open")) positionShareTooltip();
  });
  window.addEventListener(
    "scroll",
    () => {
      const { tip } = getShareTooltipEls();
      if (tip?.classList.contains("share-tooltip--open")) closeShareTooltip();
    },
    true,
  );
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const { tip } = getShareTooltipEls();
    if (tip?.classList.contains("share-tooltip--open")) {
      closeShareTooltip();
    }
  });
}

function handleTouchStart(e) {
  touchstartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
}

function applyErrorState(message) {
  const verseDisplay = document.getElementById("verseDisplay");
  currentSurahNumber = null;
  currentAyahInSurah = null;
  delete verseDisplay.dataset.surahShareArabic;
  delete verseDisplay.dataset.surahNumber;
  delete verseDisplay.dataset.ayahInSurah;
  const verseContent = document.getElementById("verseContent");
  if (verseContent) {
    verseContent.innerHTML = `<p class="error">${message}</p>`;
  }
  const surahMeta = document.getElementById("surahMeta");
  if (surahMeta) surahMeta.textContent = "";
  setSaveAyahUiVisible(false);
}

async function displayError(message) {
  if (verseTransitionLock) {
    applyErrorState(message);
    return;
  }
  await runVerseTransition(() => applyErrorState(message));
}

function handleGesture() {
  if (verseTransitionLock) return;
  const distance = touchendX - touchstartX;
  if (Math.abs(distance) > minSwipeDistance) {
    const verseDisplay = document.getElementById("verseDisplay");
    if (distance < 0) {
      verseDisplay.classList.add("swipe-left");
    } else {
      verseDisplay.classList.add("swipe-right");
    }
  }
}

document
  .getElementById("verseDisplay")
  .addEventListener("animationend", async (event) => {
    const verseDisplay = event.currentTarget;
    if (event.target !== verseDisplay) return;
    if (verseTransitionLock) return;

    if (verseDisplay.classList.contains("swipe-left")) {
      await runVerseTransition(() => fetchNewVerseCore());
      return;
    }
    if (verseDisplay.classList.contains("swipe-right")) {
      await runVerseTransition(() => fetchPrevVerseCore());
    }
  });

function openSharePreview() {
  const modal = document.getElementById("sharePreviewModal");
  const root = document.getElementById("sharePreviewCaptureRoot");
  if (!modal || !root) return;
  fillSharePreviewCaptureRoot(root);
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.getElementById("sharePreviewConfirm")?.focus();
}

function closeSharePreview() {
  const modal = document.getElementById("sharePreviewModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

function fillSharePreviewCaptureRoot(root) {
  root.replaceChildren();
  const rtl = isRtlEdition();
  const isUrdu = isUrduEdition();
  const isArabic = isArabicEdition();
  root.className =
    "share-preview-capture rounded-lg bg-[#020617] p-4 sm:p-5 " +
    (rtl ? "text-right" : "text-left");
  root.setAttribute("dir", rtl ? "rtl" : "ltr");

  const versePanel = document.getElementById("verseDisplay");
  const verseEl = versePanel?.querySelector(".verse");
  const hasError = versePanel?.querySelector(".error");
  const arabicSurahName = versePanel?.dataset.surahShareArabic ?? "";

  const logo = document.createElement("h2");
  logo.className =
    "font-logo text-lg font-extrabold tracking-tight text-solar-blue-400 sm:text-xl";
  logo.textContent = "AyahDay";
  root.appendChild(logo);

  if (hasError) {
    const err = document.createElement("p");
    err.className = "mt-3 text-sm text-red-400";
    err.textContent = hasError.textContent ?? "";
    root.appendChild(err);
  } else {
    const ayah = document.createElement("p");
    ayah.className =
      isUrdu || isArabic
        ? "font-urduHeader mt-3 text-base font-bold leading-7 text-slate-100 sm:text-lg"
        : "mt-3 text-base font-bold leading-snug text-slate-100 first-letter:uppercase sm:text-lg";
    ayah.textContent = verseEl?.textContent ?? "";

    const divider = document.createElement("div");
    divider.setAttribute("aria-hidden", "true");
    Object.assign(divider.style, {
      width: "100px",
      height: "2px",
      marginTop: "calc(1rem + 10px)",
      marginBottom: "1rem",
      borderRadius: "9999px",
      background: "rgba(148, 163, 184, 0.85)",
      alignSelf: rtl ? "flex-start" : "flex-start",
    });

    const surah = document.createElement("div");
    surah.className = "font-urduUi text-[10px] leading-relaxed text-slate-400";
    surah.setAttribute("dir", "rtl");
    surah.textContent = arabicSurahName;

    root.append(ayah, divider, surah);
  }

  const foot = document.createElement("p");
  foot.className =
    "mt-5 text-center text-[10px] font-normal leading-snug text-slate-400";
  foot.textContent = SHARE_SNAPSHOT_FOOTER;
  root.appendChild(foot);
}

/**
 * Desktop share sheets (esp. macOS) often expose Web Share with files but do not
 * hand off reliably to WhatsApp. Limit file-sharing to mobile OSes where it works well.
 */
function shouldOfferWebShareFiles() {
  if (
    typeof navigator === "undefined" ||
    !navigator.share ||
    !navigator.canShare
  ) {
    return false;
  }
  const ua = navigator.userAgent || "";
  if (/Android/i.test(ua)) return true;
  if (/iPhone|iPod|iPad/i.test(ua)) return true;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
    return true;
  }
  return false;
}

function triggerSnapshotDownload(snapshotBlob) {
  const url = URL.createObjectURL(snapshotBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ayahday-${currentAyahNumber}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function openWhatsAppWithText(text) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const opened = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  if (opened) return;
  const a = document.createElement("a");
  a.href = whatsappUrl;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function captureSharePreviewBlob() {
  if (typeof html2canvas !== "function") {
    throw new Error("html2canvas is not loaded");
  }
  const target = document.getElementById("sharePreviewCaptureRoot");
  if (!target) {
    throw new Error("Share preview capture root missing");
  }
  closeLanguageMenu();
  closeShareTooltip();
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }
  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );
  const canvas = await html2canvas(target, {
    backgroundColor: "#020617",
    scale: 2,
    useCORS: true,
    logging: false,
  });
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("PNG export failed"));
    }, "image/png");
  });
}

/** Plain text for wa.me / Web Share: ayah + Arabic surah only (matches card image). */
function buildWhatsAppShareText() {
  const versePanel = document.getElementById("verseDisplay");
  if (!versePanel) {
    return `\n\nExplore more at ${SHARE_APP_URL}`;
  }
  if (versePanel.querySelector(".error")) {
    return `${versePanel.innerText}\n\nExplore more at ${SHARE_APP_URL}`;
  }
  const ayah = versePanel.querySelector(".verse")?.textContent?.trim() ?? "";
  const surahAr = versePanel.dataset.surahShareArabic?.trim() ?? "";
  const body = [ayah, surahAr].filter(Boolean).join("\n");
  return `${body}\n\nExplore more at ${SHARE_APP_URL}`;
}

async function runShareFromPreview() {
  if (shareSnapshotInProgress) return;
  shareSnapshotInProgress = true;
  const confirmBtn = document.getElementById("sharePreviewConfirm");
  const shareTextBody = buildWhatsAppShareText();

  if (confirmBtn) confirmBtn.disabled = true;

  try {
    let snapshotBlob = null;
    try {
      snapshotBlob = await captureSharePreviewBlob();
    } catch (err) {
      console.warn("AyahDay snapshot capture failed:", err);
    }

    if (snapshotBlob) {
      const file = new File([snapshotBlob], "ayahday-verse.png", {
        type: "image/png",
      });
      const useWebShare =
        shouldOfferWebShareFiles() && navigator.canShare?.({ files: [file] });
      if (useWebShare) {
        try {
          await navigator.share({
            files: [file],
            text: shareTextBody,
          });
          closeSharePreview();
          return;
        } catch (err) {
          if (err.name === "AbortError") {
            closeSharePreview();
            return;
          }
          console.warn("Web Share failed:", err);
        }
      }
      try {
        triggerSnapshotDownload(snapshotBlob);
      } catch (_) {
        /* ignore */
      }
    }

    openWhatsAppWithText(shareTextBody);
    closeSharePreview();
  } finally {
    shareSnapshotInProgress = false;
    if (confirmBtn) confirmBtn.disabled = false;
  }
}

function handleLanguageChange(languageEdition) {
  const selectedLanguage = normalizeLanguage(languageEdition);
  if (selectedLanguage === currentLang) return;

  currentLang = selectedLanguage;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang);
  syncLanguageMenuUI();
  updateLanguageDisplay();
  fetchAndDisplayAyah(currentAyahNumber, { fadeOut: true });
}

function updateLanguageDisplay() {
  const verseDisplay = document.getElementById("verseDisplay");
  const tagline = document.getElementById("tagline");
  const {
    btn: shareBtn,
    tip: shareTooltip,
    label: shareTooltipLabel,
  } = getShareTooltipEls();
  closeShareTooltip();
  syncLanguageMenuUI();

  verseDisplay.classList.remove("urdu-style", "arabic-style");

  if (isUrduEdition()) {
    verseDisplay.classList.add("urdu-style");
    verseDisplay.setAttribute("dir", "rtl");
    document.documentElement.lang = "ur-PK";
    document.documentElement.dir = "ltr";
    if (tagline) {
      tagline.className =
        "element-to-hide mt-0.5 font-urduHeader text-sm font-medium leading-8 text-solar-gold";
      tagline.setAttribute("dir", "rtl");
      tagline.textContent = "انگریزی، عربی، اردو اور مالے میں روزانہ کی آیات";
    }
    if (shareTooltipLabel) {
      shareTooltipLabel.textContent = "واٹس ایپ پر شیئر کریں";
    }
    if (shareBtn) {
      shareBtn.setAttribute("aria-label", "واٹس ایپ پر شیئر کریں");
    }
    if (shareTooltip) {
      shareTooltip.classList.add("font-urduUi", "leading-7");
      shareTooltip.setAttribute("dir", "rtl");
    }
    updateUpdatesModalChrome();
    return;
  }

  if (isArabicEdition()) {
    verseDisplay.classList.add("arabic-style");
    verseDisplay.setAttribute("dir", "rtl");
    document.documentElement.lang = "ar";
    document.documentElement.dir = "ltr";
    if (tagline) {
      tagline.className =
        "element-to-hide mt-0.5 font-urduHeader text-sm font-medium leading-8 text-solar-gold";
      tagline.setAttribute("dir", "rtl");
      tagline.textContent =
        "آيات قرآنية يومية بالعربية والإنجليزية والأردية والملايو";
    }
    if (shareTooltipLabel) {
      shareTooltipLabel.textContent = "شارك على واتساب";
    }
    if (shareBtn) {
      shareBtn.setAttribute("aria-label", "شارك على واتساب");
    }
    if (shareTooltip) {
      shareTooltip.classList.add("font-urduUi", "leading-7");
      shareTooltip.setAttribute("dir", "rtl");
    }
    updateUpdatesModalChrome();
    return;
  }

  const isMalay = currentLang === "ms.basmeih";
  verseDisplay.setAttribute("dir", "ltr");
  document.documentElement.lang = isMalay ? "ms-MY" : "en-PK";
  document.documentElement.dir = "ltr";
  if (tagline) {
    tagline.className =
      "element-to-hide mt-0.5 text-xs font-medium text-solar-gold";
    tagline.removeAttribute("dir");
    tagline.textContent = "Daily Quranic verses in Multiple Languages";
  }
  if (shareTooltipLabel) {
    shareTooltipLabel.textContent = "Share on WhatsApp";
  }
  if (shareBtn) {
    shareBtn.setAttribute("aria-label", "Share on WhatsApp");
  }
  if (shareTooltip) {
    shareTooltip.classList.remove("font-urduUi", "leading-7");
    shareTooltip.removeAttribute("dir");
  }
  updateUpdatesModalChrome();
}

async function fetchNewVerseCore() {
  ayahHistory.push(currentAyahNumber);
  currentAyahNumber = getRandomAyahNumber();
  const data = await fetchAyah(currentAyahNumber);
  if (data) applyVerseData(data);
  nextAyahData = await fetchAyah(getRandomAyahNumber());
  updatePrevButtonState();
}

async function fetchNewVerse() {
  if (verseTransitionLock) return;
  await runVerseTransition(() => fetchNewVerseCore());
}

async function fetchPrevVerseCore() {
  if (ayahHistory.length === 0) {
    console.log("No previous Ayah available.");
    return;
  }
  currentAyahNumber = ayahHistory.pop();
  const data = await fetchAyah(currentAyahNumber);
  if (data) applyVerseData(data);
  updatePrevButtonState();
}

async function fetchPrevVerse() {
  if (verseTransitionLock || ayahHistory.length === 0) return;
  await runVerseTransition(() => fetchPrevVerseCore());
}

function updatePrevButtonState() {
  const prevBtn = document.getElementById("prevBtn");
  if (ayahHistory.length > 0) {
    prevBtn.classList.remove("disabled");
  } else {
    prevBtn.classList.add("disabled");
  }
}

// --- Saved ayahs (LocalStorage, max 5) ---

function getSavedAyahs() {
  try {
    const raw = localStorage.getItem(SAVED_AYAHS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        Number.isInteger(item.surah) &&
        Number.isInteger(item.ayah) &&
        item.surah >= 1 &&
        item.ayah >= 1,
    );
  } catch {
    return [];
  }
}

function persistSavedAyahs(saved) {
  localStorage.setItem(SAVED_AYAHS_STORAGE_KEY, JSON.stringify(saved));
}

function savedAyahKey(surah, ayah) {
  return `${surah}:${ayah}`;
}

function findSavedAyahIndex(saved, surah, ayah) {
  const key = savedAyahKey(surah, ayah);
  return saved.findIndex((item) => savedAyahKey(item.surah, item.ayah) === key);
}

function isAyahSaved(surah, ayah) {
  return findSavedAyahIndex(getSavedAyahs(), surah, ayah) >= 0;
}

function removeSavedAyah(surah, ayah) {
  const saved = getSavedAyahs();
  const index = findSavedAyahIndex(saved, surah, ayah);
  if (index < 0) return;
  saved.splice(index, 1);
  persistSavedAyahs(saved);
}

function formatSavedAyahLabel(surah, ayah) {
  return `Surah ${surah}, Ayah ${ayah}`;
}

function setSaveAyahUiVisible(visible) {
  const footer = document.getElementById("versePanelFooter");
  if (footer) footer.hidden = !visible;
}

function updateSaveHeartState() {
  const btn = document.getElementById("saveAyahBtn");
  if (!btn || currentSurahNumber == null || currentAyahInSurah == null) return;
  const saved = isAyahSaved(currentSurahNumber, currentAyahInSurah);
  btn.setAttribute("aria-pressed", String(saved));
  const label = saved ? "Unsave ayah" : "Save ayah";
  btn.setAttribute("aria-label", label);
  btn.title = label;
}

function showSaveToast(message) {
  const toast = document.getElementById("saveToast");
  if (!toast) return;
  if (saveToastHideTimer) {
    clearTimeout(saveToastHideTimer);
    saveToastHideTimer = null;
  }
  toast.textContent = message;
  toast.hidden = false;
  saveToastHideTimer = setTimeout(() => {
    toast.hidden = true;
    saveToastHideTimer = null;
  }, SAVE_TOAST_MS);
}

function renderSavedReflectionsList() {
  const list = document.getElementById("savedReflectionsList");
  const empty = document.getElementById("savedReflectionsEmpty");
  if (!list || !empty) return;

  const saved = getSavedAyahs();
  list.replaceChildren();
  if (!saved.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  saved.forEach(({ surah, ayah }, index) => {
    const li = document.createElement("li");
    li.className = "saved-menu-item saved-menu-item--enter";
    li.style.animationDelay = `${index * 45}ms`;

    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.className = "saved-menu-item__view";
    viewBtn.setAttribute("role", "menuitem");
    viewBtn.textContent = formatSavedAyahLabel(surah, ayah);
    viewBtn.addEventListener("click", () => viewSavedAyah(surah, ayah));

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "saved-menu-item__remove";
    removeBtn.setAttribute(
      "aria-label",
      `Remove ${formatSavedAyahLabel(surah, ayah)}`,
    );
    removeBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
    removeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      removeSavedAyah(surah, ayah);
      renderSavedReflectionsList();
      updateSaveHeartState();
    });

    li.append(viewBtn, removeBtn);
    list.appendChild(li);
  });
}

async function viewSavedAyah(surah, ayah) {
  closeSavedMenu();
  if (verseTransitionLock) return;
  await runVerseTransition(async () => {
    ayahHistory.push(currentAyahNumber);
    const data = await fetchAyah(`${surah}:${ayah}`);
    if (data) applyVerseData(data);
    updatePrevButtonState();
  });
}

function openSavedMenu() {
  const menu = document.getElementById("saved-menu");
  const trigger = document.getElementById("savedMenuTrigger");
  const dropdown = document.getElementById("savedMenuDropdown");
  if (!menu || !trigger || !dropdown) return;
  renderSavedReflectionsList();
  menu.dataset.open = "true";
  trigger.setAttribute("aria-expanded", "true");
  dropdown.setAttribute("aria-hidden", "false");
}

function closeSavedMenu() {
  const menu = document.getElementById("saved-menu");
  const trigger = document.getElementById("savedMenuTrigger");
  const dropdown = document.getElementById("savedMenuDropdown");
  if (!menu || !trigger || !dropdown) return;
  menu.dataset.open = "false";
  trigger.setAttribute("aria-expanded", "false");
  dropdown.setAttribute("aria-hidden", "true");
}

function toggleSavedMenu() {
  const menu = document.getElementById("saved-menu");
  if (!menu) return;
  if (menu.dataset.open === "true") {
    closeSavedMenu();
    return;
  }
  openSavedMenu();
}

function toggleSaveCurrentAyah() {
  if (currentSurahNumber == null || currentAyahInSurah == null) return;

  const saved = getSavedAyahs();
  const existingIndex = findSavedAyahIndex(
    saved,
    currentSurahNumber,
    currentAyahInSurah,
  );

  if (existingIndex >= 0) {
    saved.splice(existingIndex, 1);
    persistSavedAyahs(saved);
    updateSaveHeartState();
    renderSavedReflectionsList();
    return;
  }

  if (saved.length >= MAX_SAVED_AYAHS) {
    showSaveToast("Limit reached. Unsave an ayah to add a new one.");
    return;
  }

  saved.push({ surah: currentSurahNumber, ayah: currentAyahInSurah });
  persistSavedAyahs(saved);
  updateSaveHeartState();
  renderSavedReflectionsList();
  openSavedMenu();
}

function initSavedAyahs() {
  const saveBtn = document.getElementById("saveAyahBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", toggleSaveCurrentAyah);
  }

  const savedMenuTrigger = document.getElementById("savedMenuTrigger");
  if (savedMenuTrigger) {
    savedMenuTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleSavedMenu();
    });
  }

  renderSavedReflectionsList();
}

function updateDateTime() {
  const date = new Date();
  const day = date
    .toLocaleDateString(undefined, { weekday: "long" })
    .slice(0, 3);
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear().toString().slice(2);
  const dateNum = date.getDate();

  const dateString = `${day}, ${dateNum} ${month} '${year}`;

  document.getElementById("datetime").textContent = dateString;
}

updateDateTime();
setInterval(updateDateTime, 60000);
