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
const LANGUAGE_CODES = {
  "en.asad": "EN",
  [ARABIC_EDITION]: "AR",
  "ur.maududi": "UR",
  "ms.basmeih": "MS",
};
const WHATS_NEW_APP_VERSION = "1.0.0";
/**
 * App updates — newest first. Bump WHATS_NEW_RELEASE_ID when adding an entry.
 * icon: Material Symbols name; theme: icon badge color (rose | cyan | amber | emerald).
 */
const WHATS_NEW_RELEASES = [
  {
    id: "ayah-recitation",
    icon: "volume_up",
    theme: "emerald",
    copy: {
      en: {
        title: "Arabic recitation",
        description:
          "Play the current ayah in Arabic. The recording is by Mishary Rashid Alafasy.",
      },
      ur: {
        title: "عربی تلاوت",
        description:
          "موجودہ آیت کی عربی تلاوت سنیں۔ یہ ریکارڈنگ مشاری راشد العفاسی کی ہے۔",
      },
      ar: {
        title: "تلاوة عربية",
        description:
          "استمع إلى الآية الحالية بالعربية. التسجيل لمشاري راشد العفاسي.",
      },
      ms: {
        title: "Bacaan Arab",
        description:
          "Dengar ayat semasa dalam bahasa Arab. Rakaman oleh Mishary Rashid Alafasy.",
      },
    },
  },
  {
    id: "vertical-scroll",
    icon: "swipe_vertical",
    theme: "cyan",
    copy: {
      en: {
        title: "Scroll between ayahs",
        description:
          "Swipe up or down to move through verses, one ayah on each screen.",
      },
      ur: {
        title: "آیات کے درمیان سکرول",
        description:
          "اوپر یا نیچے سوائپ کریں۔ ہر اسکرین پر ایک آیت۔",
      },
      ar: {
        title: "تمرير بين الآيات",
        description:
          "اسحب للأعلى أو للأسفل للتنقل بين الآيات، آية واحدة في كل شاشة.",
      },
      ms: {
        title: "Tatal antara ayat",
        description:
          "Leret ke atas atau ke bawah untuk beralih ayat. Satu ayat setiap skrin.",
      },
    },
  },
  {
    id: "light-dark-theme",
    icon: "contrast",
    theme: "cyan",
    copy: {
      en: {
        title: "Light & dark mode",
        description:
          "Tap the contrast icon in the header to switch between light and dark theme.",
      },
      ur: {
        title: "لائٹ اور ڈارک موڈ",
        description:
          "ہیڈر میں کنٹراسٹ آئیکن سے لائٹ اور ڈارک تھیم تبدیل کریں۔",
      },
      ar: {
        title: "الوضع الفاتح والداكن",
        description:
          "اضغط أيقونة التباين في الشريط العلوي للتبديل بين السمة الفاتحة والداكنة.",
      },
      ms: {
        title: "Mod terang & gelap",
        description:
          "Ketik ikon kontras di pengepala untuk tukar antara tema terang dan gelap.",
      },
    },
  },
  {
    id: "saved-reflections",
    icon: "bookmark",
    theme: "rose",
    copy: {
      en: {
        title: "Saved reflections",
        description:
          "Save up to 5 ayahs with the bookmark on each verse. Open your list from the bookmark beside the menu.",
      },
      ur: {
        title: "محفوظ آیات",
        description:
          "ہر آیت پر بک مارک سے زیادہ سے زیادہ ۵ آیات محفوظ کریں۔ فہرست اوپر بک مارک سے کھولیں۔",
      },
      ar: {
        title: "الآيات المحفوظة",
        description:
          "احفظ حتى ٥ آيات بأيقونة الإشارة على كل آية. اعرض قائمتك من الإشارة في الأعلى.",
      },
      ms: {
        title: "Ayat tersimpan",
        description:
          "Simpan sehingga 5 ayat dengan ikon penanda pada setiap ayat. Buka senarai dari ikon penanda di atas.",
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
const HEADER_WIZARD_SEEN_KEY = "ayahday-header-wizard-seen";
const SCROLL_HINT_SEEN_KEY = "ayahday-scroll-hint-seen";
const SCROLL_HINT_MS = 3100;
const MAX_SAVED_AYAHS = 5;
const SAVE_TOAST_MS = 3500;
const WIZARD_START_DELAY_MS = 1000;
const WIZARD_STEP_VISIBLE_MS = 3000;
const WIZARD_FADE_MS = 300;
const HEADER_WIZARD_STEPS = [
  {
    hintId: "moreMenuHint",
    text: "What's new, FAQ, and feedback",
    pulseTargetId: "moreMenuBtn",
  },
  {
    hintId: "themeToggleHint",
    text: "Switch to Dark Theme",
    pulseTargetId: "themeToggleBtn",
  },
  {
    hintId: "savedMenuHint",
    text: "Your saved Ayahs",
    pulseTargetId: "savedMenuTrigger",
  },
];

let currentLang = normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
let currentAyahNumber = getRandomAyahNumber();
let currentSurahNumber = null;
let currentAyahInSurah = null;
let pendingAyahData = null;
let reelObserver = null;
let feedAheadPromise = null;
let feedAheadFailures = 0;

const API_CONFIG = {
  url: "https://api.alquran.cloud/v1/ayah",
};

const RECITE_AUDIO_BASE =
  "https://cdn.islamic.network/quran/audio/128/ar.alafasy";
const RECITE_SETTLE_MS = 200;
const RECITE_LOAD_TIMEOUT_MS = 15000;
const RECITE_HINT_SEEN_KEY = "ayahday-recite-hint-seen";
const RECITE_HINT_MS = 4000;
const RECITE_HINT_TEXT = "Listen to this ayah";
const RECITE_RING_LENGTH = 119.381;
const RECITE_LABELS = {
  loading: "Loading recitation",
  ready: "Play recitation",
  playing: "Pause recitation",
  error: "Retry recitation",
  idle: "Recitation unavailable",
};

const SHARE_APP_URL = "https://www.ayahday.cc/";
const SHARE_SNAPSHOT_FOOTER =
  "AyahDay.cc - Daily Quranic verses in Multiple Languages";

const SHARE_TOOLTIP_MS = 3000;
let shareTooltipHideTimer = null;
let shareSnapshotInProgress = false;

const BOOT_OVERLAY_FALLBACK_MS = 20000;
const CLOUD_PROBE_MS = 1200;
const FEED_ERROR_MESSAGE = "Error fetching verse. Please try again later.";
let bootOverlayFallbackTimer = null;
let saveToastHideTimer = null;
let saveHintTimer = null;
let headerWizardAbort = null;
let reciteAudio = null;
let reciteLoadTimer = null;
let reciteLoadTimeout = null;
let reciteGeneration = 0;
let reciteTargetAyah = null;
let reciteHintTimer = null;
let reciteHintWaitingForWizard = false;

document.addEventListener("DOMContentLoaded", async () => {
  scheduleBootOverlayFallback();
  try {
    initThemeToggle();
    initLanguageSelect();
    initUpdatesModal();
    initReelFeed();
    const bootData = await fetchAyah(currentAyahNumber);
    const firstSlide = bootData
      ? appendSlide(bootData)
      : appendErrorSlide(FEED_ERROR_MESSAGE);
    activateSlide(firstSlide);
    addEventListeners();
    initSavedAyahs();
    initShareTooltip();
    updateLanguageDisplay();
    initHeaderWizard();
    preloadVerseFonts();
    } catch (err) {
    console.error("AyahDay boot failed:", err);
    if (!getSlides().length) appendErrorSlide(FEED_ERROR_MESSAGE);
  } finally {
    revealBootOverlay();
    initScrollHint();
  }
});

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

const FALLBACK_QURAN_BASE =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1";
const FALLBACK_CHAPTERS_URL =
  "https://api.quran.com/api/v4/chapters?language=en";
const FALLBACK_EDITION_FILES = {
  "en.asad": "eng-muhammadasad",
  "ur.maududi": "urd-abulaalamaududi",
  "ms.basmeih": "msa-abdullahmuhamma",
  [ARABIC_EDITION]: "ara-quranuthmanihaf",
};

let quranCloudDisabled = false;
let quranSource = "pending";
let fallbackNoticeShown = false;
let fallbackChaptersPromise = null;
let openingAyahPromise = null;
const fallbackEditionPromises = new Map();

function markCloudDown() {
  quranCloudDisabled = true;
  quranSource = "fallback";
  if (!fallbackNoticeShown) {
    fallbackNoticeShown = true;
    console.warn(
      "Al Quran Cloud is unavailable. Loading verses from the backup text.",
    );
  }
}

async function fetchAyahFromCloud(ayahRef, requestedLang, signal) {
  const init = signal ? { signal } : undefined;
  if (isArabicEdition(requestedLang)) {
    const response = await fetch(
      `${API_CONFIG.url}/${ayahRef}/${ARABIC_EDITION}`,
      init,
    );
    if (!response.ok) throw new Error("Failed to fetch Ayah");
    const payload = await response.json();
    return verseDataFromArabicPayload(payload, payload.data.text);
  }
  const arabicResponse = await fetch(
    `${API_CONFIG.url}/${ayahRef}/${ARABIC_EDITION}`,
    init,
  );
  const translationResponse = await fetch(
    `${API_CONFIG.url}/${ayahRef}/${requestedLang}`,
    init,
  );
  if (!arabicResponse.ok || !translationResponse.ok) {
    throw new Error("Failed to fetch Ayah");
  }
  const arabicData = await arabicResponse.json();
  const translationData = await translationResponse.json();
  return verseDataFromArabicPayload(arabicData, translationData.data.text);
}

function loadFallbackChapters(signal) {
  if (!fallbackChaptersPromise) {
    fallbackChaptersPromise = fetch(FALLBACK_CHAPTERS_URL, { signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load chapter list");
        const payload = await response.json();
        return payload.chapters.slice().sort((a, b) => a.id - b.id);
      })
      .catch((error) => {
        fallbackChaptersPromise = null;
        throw error;
      });
  }
  return fallbackChaptersPromise;
}

function loadFallbackEdition(editionId, signal) {
  if (!fallbackEditionPromises.has(editionId)) {
    const pending = fetch(
      `${FALLBACK_QURAN_BASE}/editions/${editionId}.min.json`,
      { signal },
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to load Quran text");
        const payload = await response.json();
        const texts = new Map();
        for (const row of payload.quran) {
          texts.set(`${row.chapter}:${row.verse}`, row.text);
        }
        return texts;
      })
      .catch((error) => {
        fallbackEditionPromises.delete(editionId);
        throw error;
      });
    fallbackEditionPromises.set(editionId, pending);
  }
  return fallbackEditionPromises.get(editionId);
}

function locateAyah(ayahRef, chapters) {
  if (typeof ayahRef === "string" && ayahRef.includes(":")) {
    const [surah, ayah] = ayahRef.split(":").map(Number);
    if (!surah || !ayah) return null;
    let global = ayah;
    for (let index = 0; index < surah - 1; index += 1) {
      global += chapters[index].verses_count;
    }
    return { surah, ayah, global };
  }
  const global = Number(ayahRef);
  if (!Number.isInteger(global) || global < 1) return null;
  let remaining = global;
  for (const chapter of chapters) {
    if (remaining <= chapter.verses_count) {
      return { surah: chapter.id, ayah: remaining, global };
    }
    remaining -= chapter.verses_count;
  }
  return null;
}

async function fetchAyahFromFallback(ayahRef, requestedLang, signal) {
  const editionId = FALLBACK_EDITION_FILES[requestedLang];
  if (!editionId) throw new Error("Unsupported edition");
  const [chapters, texts] = await Promise.all([
    loadFallbackChapters(signal),
    loadFallbackEdition(editionId, signal),
  ]);
  const located = locateAyah(ayahRef, chapters);
  const chapter = located && chapters[located.surah - 1];
  const text = located && texts.get(`${located.surah}:${located.ayah}`);
  if (!located || !chapter || !text) throw new Error("Missing ayah text");
  const place =
    chapter.revelation_place === "madinah" ? "Medinan" : "Meccan";
  return {
    data: {
      text,
      surah: {
        name: `سُورَةُ ${chapter.name_arabic}`,
        englishName: chapter.name_simple,
        englishNameTranslation: chapter.translated_name?.name || "",
        revelationType: place,
      },
      globalNumber: located.global,
      surahNumber: located.surah,
      ayahInSurah: located.ayah,
    },
  };
}

async function raceOpeningAyah(ayahRef, requestedLang) {
  const cloudAbort = new AbortController();
  const fallbackAbort = new AbortController();
  const cloudTimer = setTimeout(() => cloudAbort.abort(), CLOUD_PROBE_MS);
  const cloudTask = fetchAyahFromCloud(
    ayahRef,
    requestedLang,
    cloudAbort.signal,
  )
    .then((data) => ({ source: "cloud", data }))
    .catch(() => null);
  const fallbackTask = fetchAyahFromFallback(
    ayahRef,
    requestedLang,
    fallbackAbort.signal,
  )
    .then((data) => ({ source: "fallback", data }))
    .catch(() => null);

  const cloud = await Promise.race([
    cloudTask,
    sleep(CLOUD_PROBE_MS).then(() => "timeout"),
  ]);
  clearTimeout(cloudTimer);

  if (cloud && cloud !== "timeout" && cloud.data) {
    quranSource = "cloud";
    cloudAbort.abort();
    fallbackAbort.abort();
    return { ayahRef, lang: requestedLang, data: cloud.data };
  }

  cloudAbort.abort();
  markCloudDown();
  const settled = await fallbackTask;
  if (!settled?.data) throw new Error("Failed to fetch Ayah");
  return { ayahRef, lang: requestedLang, data: settled.data };
}

async function fetchAyah(ayahRef) {
  const requestedLang = currentLang;
  try {
    if (quranSource === "pending") {
      if (!openingAyahPromise) {
        openingAyahPromise = raceOpeningAyah(ayahRef, requestedLang).catch(
          (error) => {
            openingAyahPromise = null;
            throw error;
          },
        );
      }
      const opening = await openingAyahPromise;
      if (requestedLang !== currentLang) return null;
      if (opening.ayahRef === String(ayahRef) || opening.ayahRef === ayahRef) {
        if (opening.lang === requestedLang) return opening.data;
      }
    }
    if (!quranCloudDisabled && quranSource !== "fallback") {
      try {
        const cloud = await fetchAyahFromCloud(ayahRef, requestedLang);
        if (requestedLang !== currentLang) return null;
        quranSource = "cloud";
        return cloud;
      } catch (error) {
        markCloudDown();
      }
    }
    const fallback = await fetchAyahFromFallback(ayahRef, requestedLang);
    if (requestedLang !== currentLang) return null;
    return fallback;
  } catch (error) {
    console.error("Error fetching verse:", error);
    return null;
  }
}

function getReelFeed() {
  return document.getElementById("reelFeed");
}

function getSlides() {
  const feed = getReelFeed();
  return feed ? [...feed.querySelectorAll(".reel-slide")] : [];
}

function getActiveSlide() {
  return (
    document.querySelector(".reel-slide.is-active") ||
    document.querySelector(".reel-slide")
  );
}

function applySlideLanguage(slide) {
  if (!slide) return;
  slide.classList.remove("urdu-style", "arabic-style");
  slide.setAttribute("dir", "ltr");
  if (isUrduEdition()) slide.classList.add("urdu-style");
  else if (isArabicEdition()) slide.classList.add("arabic-style");
  slide.querySelectorAll(".verse").forEach((verse) => {
    verse.setAttribute("dir", isRtlEdition() ? "rtl" : "ltr");
  });
}

function createSlideShell() {
  const slide = document.createElement("section");
  slide.className = "reel-slide ayah-day-verse-panel";
  slide.innerHTML = `
    <div class="reel-slide__frame">
      <div class="reel-slide__verse-wrap">
        <div class="reel-slide__verse"></div>
        <div class="reel-slide__more" hidden aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path d="M6 9.5 12 15.5 18 9.5" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="reel-slide__caption">
        <div class="verse-surah-divider" aria-hidden="true"></div>
        <p class="surah"></p>
      </div>
    </div>
  `;
  applySlideLanguage(slide);
  return slide;
}

function surahCaptionFragment(surahInfo, surahNumber, ayahInSurah) {
  const fragment = document.createDocumentFragment();
  const line = document.createElement("span");
  line.textContent = `${surahInfo.name} (${surahInfo.englishName}, ${surahInfo.englishNameTranslation})`;
  const reference = document.createElement("span");
  reference.textContent = `${surahInfo.revelationType} ${formatSavedAyahLabel(surahNumber, ayahInSurah)}`;
  fragment.append(line, document.createElement("br"), reference);
  return fragment;
}

function fillSlide(slide, data) {
  const surahInfo = data.data.surah;
  slide.dataset.ayahNumber = String(data.data.globalNumber);
  slide.dataset.surahNumber = String(data.data.surahNumber);
  slide.dataset.ayahInSurah = String(data.data.ayahInSurah);
  slide.dataset.surahShareArabic = surahInfo.name;
  slide.dataset.error = "false";
  slide.setAttribute(
    "aria-label",
    `${surahInfo.englishName}, ${surahInfo.revelationType} ${formatSavedAyahLabel(data.data.surahNumber, data.data.ayahInSurah)}`,
  );

  const verseHost = slide.querySelector(".reel-slide__verse");
  verseHost.replaceChildren();
  const verse = document.createElement("p");
  verse.className = "verse";
  verse.textContent = data.data.text;
  verseHost.appendChild(verse);

  const caption = slide.querySelector(".reel-slide__caption");
  caption.hidden = false;
  caption.querySelector(".surah").replaceChildren(
    surahCaptionFragment(
      surahInfo,
      data.data.surahNumber,
      data.data.ayahInSurah,
    ),
  );
  applySlideLanguage(slide);
  fitSlideVerse(slide);
}

function fillSlideError(slide, message) {
  delete slide.dataset.ayahNumber;
  delete slide.dataset.surahShareArabic;
  delete slide.dataset.surahNumber;
  delete slide.dataset.ayahInSurah;
  slide.dataset.error = "true";
  slide.setAttribute("aria-label", "Verse unavailable");

  const verseHost = slide.querySelector(".reel-slide__verse");
  verseHost.replaceChildren();
  const error = document.createElement("p");
  error.className = "error";
  error.textContent = message;
  verseHost.appendChild(error);
  slide.querySelector(".reel-slide__caption").hidden = true;
}

function observeSlide(slide) {
  reelObserver?.observe(slide);
}

function mountSlide(slide, before) {
  const feed = getReelFeed();
  if (!feed || !slide) return slide;
  if (before) feed.insertBefore(slide, before);
  else feed.appendChild(slide);
  observeSlide(slide);
  fitSlideVerse(slide);
  return slide;
}

function appendSlide(data) {
  const slide = createSlideShell();
  fillSlide(slide, data);
  return mountSlide(slide);
}

function appendErrorSlide(message) {
  const slide = createSlideShell();
  fillSlideError(slide, message);
  return mountSlide(slide);
}

function syncActiveFromSlide(slide) {
  if (!slide) return;
  const ayahNumber = Number(slide.dataset.ayahNumber);
  currentAyahNumber = Number.isInteger(ayahNumber)
    ? ayahNumber
    : currentAyahNumber;
  currentSurahNumber = slide.dataset.surahNumber
    ? Number(slide.dataset.surahNumber)
    : null;
  currentAyahInSurah = slide.dataset.ayahInSurah
    ? Number(slide.dataset.ayahInSurah)
    : null;
  updateSaveHeartState();
  syncRecitationToSlide(slide);
}

function activateSlide(slide) {
  if (!slide) return;
  getSlides().forEach((item) => {
    item.classList.toggle("is-active", item === slide);
  });
  syncActiveFromSlide(slide);
  void ensureFeedAhead();
}

function initReelFeed() {
  const feed = getReelFeed();
  if (!feed || reelObserver) return;
  reelObserver = new IntersectionObserver(
    (entries) => {
      const best = entries
        .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.6)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (best) activateSlide(best.target);
    },
    { root: feed, threshold: [0.6, 0.85] },
  );
  feed.addEventListener(
    "scroll",
    () => {
      closeLanguageMenu();
      closeMoreMenu();
      closeSavedMenu();
    },
    { passive: true },
  );
  if (window.ResizeObserver) {
    new ResizeObserver(() => fitMountedVerses()).observe(feed);
  } else {
    window.addEventListener("resize", () => fitMountedVerses());
  }
  document.fonts?.ready.then(() => fitMountedVerses());
  document.fonts?.addEventListener("loadingdone", () => {
    requestAnimationFrame(() => fitMountedVerses());
  });
}

function verseOverflowsHost(host, verse) {
  if (verse.scrollHeight > host.clientHeight + 1) return true;
  const range = document.createRange();
  range.selectNodeContents(verse);
  const hostRect = host.getBoundingClientRect();
  const rects = range.getClientRects();
  for (let i = 0; i < rects.length; i += 1) {
    if (rects[i].top < hostRect.top - 1 || rects[i].bottom > hostRect.bottom + 1) {
      return true;
    }
  }
  return false;
}

function fitSlideVerse(slide) {
  const host = slide?.querySelector(".reel-slide__verse");
  const verse = host?.querySelector(".verse");
  if (!host || !verse) return;
  const wasOverflowing = host.classList.contains("is-overflowing");
  host.classList.remove("is-overflowing");
  if (host.clientHeight < 40) return;
  verse.style.fontSize = "";
  const maxSize = parseFloat(getComputedStyle(verse).fontSize);
  if (!Number.isFinite(maxSize)) return;
  if (!verseOverflowsHost(host, verse)) {
    syncVerseMoreHint(host);
    return;
  }

  const minSize = 15;
  let low = minSize;
  let high = Math.max(maxSize, minSize);
  let fitted = low;
  for (let step = 0; step < 12; step += 1) {
    const mid = (low + high) / 2;
    verse.style.fontSize = `${mid}px`;
    if (!verseOverflowsHost(host, verse)) {
      fitted = mid;
      low = mid;
    } else {
      high = mid;
    }
  }
  verse.style.fontSize = `${fitted}px`;
  if (!verseOverflowsHost(host, verse)) {
    syncVerseMoreHint(host);
    return;
  }

  verse.style.fontSize = `${minSize}px`;
  if (verseOverflowsHost(host, verse)) {
    host.classList.add("is-overflowing");
    if (!wasOverflowing) host.scrollTop = 0;
  }
  syncVerseMoreHint(host);
}

function syncVerseMoreHint(host) {
  if (!host) return;
  const more = host.parentElement?.querySelector(".reel-slide__more");
  const overflowing = host.classList.contains("is-overflowing");
  const atEnd =
    !overflowing ||
    host.scrollTop + host.clientHeight >= host.scrollHeight - 12;
  host.classList.toggle("is-scrolled-end", atEnd);
  if (more) more.hidden = !overflowing || atEnd;
  if (host.dataset.moreBound === "1") return;
  host.dataset.moreBound = "1";
  host.addEventListener("scroll", () => syncVerseMoreHint(host), {
    passive: true,
  });
}

function fitMountedVerses() {
  getSlides().forEach(fitSlideVerse);
}

async function ensureFeedAhead() {
  const slides = getSlides();
  const index = slides.indexOf(getActiveSlide());
  if (index < 0 || index < slides.length - 1) return;
  if (feedAheadPromise) return feedAheadPromise;

  let releaseAhead;
  const run = new Promise((resolve) => {
    releaseAhead = resolve;
  });
  feedAheadPromise = run;

  let appended = false;
  try {
    const queued = pendingAyahData;
    if (queued) pendingAyahData = null;
    const data = queued || (await fetchAyah(getRandomAyahNumber()));
    if (!data) {
      feedAheadFailures += 1;
      const delay = Math.min(1500 * feedAheadFailures, 8000);
      setTimeout(() => {
        void ensureFeedAhead();
      }, delay);
      return;
    }
    feedAheadFailures = 0;
    appendSlide(data);
    appended = true;
  } finally {
    if (feedAheadPromise === run) feedAheadPromise = null;
    releaseAhead();
  }

  if (!appended || pendingAyahData) return;
  void fetchAyah(getRandomAyahNumber()).then((next) => {
    if (next && !pendingAyahData) pendingAyahData = next;
  });
}

function setReelScrollPaused(paused) {
  getReelFeed()?.classList.toggle("reel-feed--paused", paused);
}

function isReelChromeOpen() {
  const shareModal = document.getElementById("sharePreviewModal");
  const updatesModal = document.getElementById("updatesModal");
  if (shareModal && !shareModal.hidden) return true;
  if (updatesModal && !updatesModal.hidden) return true;
  if (document.getElementById("more-menu")?.dataset.open === "true") return true;
  if (document.getElementById("saved-menu")?.dataset.open === "true") return true;
  if (document.getElementById("language-menu")?.dataset.open === "true") {
    return true;
  }
  return false;
}

async function scrollToAdjacentSlide(direction) {
  if (isReelChromeOpen()) return;
  const slides = getSlides();
  const index = slides.indexOf(getActiveSlide());
  if (index < 0) return;
  if (direction > 0 && index === slides.length - 1) {
    await ensureFeedAhead();
  }
  const next = getSlides()[index + direction];
  next?.scrollIntoView({ block: "start" });
}

function scheduleBootOverlayFallback() {
  clearBootOverlayFallback();
  bootOverlayFallbackTimer = setTimeout(() => {
    bootOverlayFallbackTimer = null;
    if (!getSlides().length) appendErrorSlide(FEED_ERROR_MESSAGE);
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

function initScrollHint() {
  const hint = document.getElementById("scrollHint");
  const feed = getReelFeed();
  if (!hint || !feed || localStorage.getItem(SCROLL_HINT_SEEN_KEY) === "1") {
    return;
  }

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    localStorage.setItem(SCROLL_HINT_SEEN_KEY, "1");
    hint.classList.remove("is-on");
    hint.hidden = true;
    feed.removeEventListener("scroll", onFeedScroll);
  };
  const onFeedScroll = () => {
    if (feed.scrollTop > 12) finish();
  };

  window.setTimeout(() => {
    if (finished) return;
    hint.hidden = false;
    feed.addEventListener("scroll", onFeedScroll, { passive: true });
    if (prefersReducedMotion()) {
      window.setTimeout(finish, 1400);
      return;
    }
    const onEnd = (event) => {
      if (event.animationName !== "scroll-hint-out") return;
      hint.removeEventListener("animationend", onEnd);
      finish();
    };
    hint.addEventListener("animationend", onEnd);
    hint.classList.add("is-on");
    window.setTimeout(finish, SCROLL_HINT_MS);
  }, 650);
}

function getRandomAyahNumber() {
  return Math.floor(Math.random() * 6236) + 1;
}

function addEventListeners() {
  document.getElementById("reciteBtn")?.addEventListener("click", onReciteClick);
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
  const languageTrigger = document.getElementById("language-trigger");
  if (languageTrigger) {
    languageTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleLanguageMenu();
    });
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
      closeHeaderTooltip("savedMenuHint");
    }
    const moreMenu = document.getElementById("more-menu");
    const moreSheet = document.getElementById("moreMenuSheet");
    const insideMore =
      (moreMenu && moreMenu.contains(event.target)) ||
      (moreSheet && moreSheet.contains(event.target));
    if (!insideMore) closeMoreMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const shareModal = document.getElementById("sharePreviewModal");
      if (shareModal && !shareModal.hidden) {
        closeSharePreview();
        return;
      }
      closeUpdatesModal();
      closeHeaderTooltip("savedMenuHint");
      closeSavedMenu();
      closeLanguageMenu();
      closeMoreMenu();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (isReelChromeOpen()) return;
      event.preventDefault();
      void scrollToAdjacentSlide(event.key === "ArrowDown" ? 1 : -1);
    }
  });
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
  const button = document.getElementById("moreMenuBtn");
  const dot = document.getElementById("moreMenuWhatsNewDot");
  const unseen = hasUnseenUpdates();
  button?.classList.toggle("header-icon-btn--unread", unseen);
  if (dot) dot.hidden = !unseen;
}

function renderUpdatesModalCards({ animate = true } = {}) {
  const container = document.getElementById("updatesModalCards");
  const modal = document.getElementById("updatesModal");
  if (!container || !modal) return;

  const rtl = isRtlEdition();
  const shouldAnimate = animate && !prefersReducedMotion();
  container.replaceChildren();
  container.setAttribute("dir", rtl ? "rtl" : "ltr");
  if (rtl) {
    container.classList.add("font-urduUi", "leading-8");
  } else {
    container.classList.remove("font-urduUi", "leading-8");
  }

  WHATS_NEW_RELEASES.forEach((release) => {
    const { title, description } = getReleaseCopy(release);
    const card = document.createElement("article");
    card.className = `updates-card updates-card--${release.theme}`;
    if (shouldAnimate) {
      card.classList.add("updates-card--fade-in");
    }

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
    if (!modal.hidden) renderUpdatesModalCards({ animate: false });
  }
}

function openUpdatesModal() {
  const modal = document.getElementById("updatesModal");
  if (!modal || !modal.hidden) return;
  cancelHeaderWizard();
  closeSavedMenu();
  closeLanguageMenu();
  closeMoreMenu();
  updateUpdatesModalChrome();
  renderUpdatesModalCards();
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  setReelScrollPaused(true);
  document.getElementById("updatesModalClose")?.focus();
}

function closeUpdatesModal({ markSeen = false } = {}) {
  const modal = document.getElementById("updatesModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  setReelScrollPaused(false);
  if (markSeen) markUpdatesSeen();
}

function initUpdatesModal() {
  const whatsNew = document.getElementById("moreMenuWhatsNew");
  const moreBtn = document.getElementById("moreMenuBtn");
  const closeBtn = document.getElementById("updatesModalClose");
  const gotItBtn = document.getElementById("updatesModalGotIt");
  const backdrop = document.getElementById("updatesModalBackdrop");

  syncUpdatesBellBadge();
  updateUpdatesModalChrome();

  if (moreBtn) {
    moreBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      closeHeaderTooltip("moreMenuHint");
      toggleMoreMenu();
    });
  }
  if (whatsNew) {
    whatsNew.addEventListener("click", () => {
      closeMoreMenu();
      openUpdatesModal();
    });
  }
  const moreDropdown = document.getElementById("moreMenuDropdown");
  if (moreDropdown) {
    moreDropdown.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) closeMoreMenu();
    });
  }
  initMoreSheetDrag();
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
  const trigger = document.getElementById("language-trigger");
  const normalizedLanguage = normalizeLanguage(currentLang);
  const languageName = LANGUAGE_LABELS[normalizedLanguage] || "English";
  if (triggerLabel) {
    triggerLabel.textContent = LANGUAGE_CODES[normalizedLanguage] || "EN";
  }
  if (trigger) {
    trigger.setAttribute("aria-label", `Language: ${languageName}`);
    trigger.title = languageName;
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
  closeMoreMenu();
  closeSavedMenu();
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

let moreSheetMotion = 0;

function getMoreSheetParts() {
  return {
    menu: document.getElementById("more-menu"),
    trigger: document.getElementById("moreMenuBtn"),
    sheet: document.getElementById("moreMenuSheet"),
    panel: document.getElementById("moreMenuDropdown"),
  };
}

function openMoreMenu() {
  const { menu, trigger, sheet, panel } = getMoreSheetParts();
  if (!menu || !trigger || !sheet || !panel) return;
  closeSavedMenu();
  closeLanguageMenu();
  closeHeaderTooltip("moreMenuHint");
  moreSheetMotion += 1;
  panel.classList.remove("more-sheet__panel--dragging");
  panel.style.transform = "";
  panel.style.transition = "";
  sheet.hidden = false;
  sheet.dataset.open = "false";
  sheet.setAttribute("aria-hidden", "false");
  panel.setAttribute("aria-hidden", "false");
  void sheet.offsetWidth;
  menu.dataset.open = "true";
  sheet.dataset.open = "true";
  trigger.setAttribute("aria-expanded", "true");
  setReelScrollPaused(true);
  panel.focus({ preventScroll: true });
}

function closeMoreMenu() {
  const { menu, trigger, sheet, panel } = getMoreSheetParts();
  if (!menu || !trigger || !sheet || !panel) return;
  if (menu.dataset.open !== "true") return;
  const motion = ++moreSheetMotion;
  const returnFocus = sheet.contains(document.activeElement);
  menu.dataset.open = "false";
  sheet.dataset.open = "false";
  trigger.setAttribute("aria-expanded", "false");
  panel.setAttribute("aria-hidden", "true");
  const shareModal = document.getElementById("sharePreviewModal");
  const updatesModal = document.getElementById("updatesModal");
  if (
    (!shareModal || shareModal.hidden) &&
    (!updatesModal || updatesModal.hidden)
  ) {
    setReelScrollPaused(false);
  }

  panel.classList.remove("more-sheet__panel--dragging");
  if (panel.style.transform) {
    const from = panel.style.transform;
    panel.style.transition = "none";
    panel.style.transform = from;
    void panel.offsetWidth;
    panel.style.transition = "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";
    panel.style.transform = "translateY(110%)";
  }

  const finish = (event) => {
    if (event && event.target !== panel) return;
    if (event && event.propertyName && event.propertyName !== "transform") return;
    panel.removeEventListener("transitionend", finish);
    if (motion !== moreSheetMotion) return;
    panel.style.transform = "";
    panel.style.transition = "";
    sheet.hidden = true;
    sheet.setAttribute("aria-hidden", "true");
  };
  panel.addEventListener("transitionend", finish);
  setTimeout(finish, 420);
  if (returnFocus) trigger.focus({ preventScroll: true });
}

function snapMoreSheetBack() {
  const { menu, panel } = getMoreSheetParts();
  if (!panel || menu?.dataset.open !== "true") return;
  const motion = ++moreSheetMotion;
  panel.classList.remove("more-sheet__panel--dragging");
  const from = panel.style.transform || "translateY(0px)";
  panel.style.transition = "none";
  panel.style.transform = from;
  void panel.offsetWidth;
  panel.style.transition = "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";
  panel.style.transform = "translateY(0px)";
  const clear = (event) => {
    if (event && event.propertyName !== "transform") return;
    panel.removeEventListener("transitionend", clear);
    if (motion !== moreSheetMotion || menu.dataset.open !== "true") return;
    panel.style.transition = "";
    panel.style.transform = "";
  };
  panel.addEventListener("transitionend", clear);
}

function initMoreSheetDrag() {
  const { sheet, panel } = getMoreSheetParts();
  const backdrop = document.getElementById("moreMenuBackdrop");
  if (!sheet || !panel) return;
  let drag = null;
  let ignoreClick = false;

  panel.addEventListener(
    "click",
    (event) => {
      if (!ignoreClick) return;
      ignoreClick = false;
      event.preventDefault();
      event.stopPropagation();
    },
    true,
  );

  panel.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || sheet.dataset.open !== "true") return;
    drag = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      velocity: 0,
      active: false,
    };
  });

  panel.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dy = event.clientY - drag.startY;
    const dx = event.clientX - drag.startX;
    if (!drag.active) {
      if (Math.abs(dy) < 10 && Math.abs(dx) < 10) return;
      if (dy <= 0 || Math.abs(dx) > dy) {
        drag = null;
        return;
      }
      drag.active = true;
      ignoreClick = true;
      panel.classList.add("more-sheet__panel--dragging");
      try {
        panel.setPointerCapture(event.pointerId);
      } catch {
        /* Pointer capture needs an active pointer; the drag still follows move events. */
      }
    }
    const offset = Math.max(0, event.clientY - drag.startY);
    const now = performance.now();
    drag.velocity = (event.clientY - drag.lastY) / Math.max(now - drag.lastTime, 1);
    drag.lastY = event.clientY;
    drag.lastTime = now;
    panel.style.transform = `translateY(${offset}px)`;
  });

  const endDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const active = drag.active;
    const dy = event.clientY - drag.startY;
    const velocity = drag.velocity;
    drag = null;
    if (!active) return;
    ignoreClick = true;
    setTimeout(() => {
      ignoreClick = false;
    }, 400);
    if (dy > 72 || (dy > 40 && velocity > 0.55)) {
      closeMoreMenu();
      return;
    }
    snapMoreSheetBack();
  };

  panel.addEventListener("pointerup", endDrag);
  panel.addEventListener("pointercancel", endDrag);
  backdrop?.addEventListener("click", () => closeMoreMenu());
}

function toggleMoreMenu() {
  const menu = document.getElementById("more-menu");
  if (!menu) return;
  if (menu.dataset.open === "true") {
    closeMoreMenu();
    return;
  }
  openMoreMenu();
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

function openSharePreview() {
  const modal = document.getElementById("sharePreviewModal");
  const root = document.getElementById("sharePreviewCaptureRoot");
  if (!modal || !root) return;
  closeLanguageMenu();
  closeMoreMenu();
  closeSavedMenu();
  fillSharePreviewCaptureRoot(root);
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  setReelScrollPaused(true);
  document.getElementById("sharePreviewConfirm")?.focus();
}

function closeSharePreview() {
  const modal = document.getElementById("sharePreviewModal");
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  setReelScrollPaused(false);
}

function fillSharePreviewCaptureRoot(root) {
  root.replaceChildren();
  const rtl = isRtlEdition();
  const isUrdu = isUrduEdition();
  const isArabic = isArabicEdition();
  const shareBg = getShareCaptureBackground();
  const shareText = getResolvedTheme() === "dark" ? "text-slate-100" : "text-slate-800";
  const shareMuted = getResolvedTheme() === "dark" ? "text-slate-400" : "text-slate-500";
  root.className =
    `share-preview-capture rounded-lg p-4 sm:p-5 ${rtl ? "text-right" : "text-left"}`;
  root.style.backgroundColor = shareBg;
  root.setAttribute("dir", rtl ? "rtl" : "ltr");

  const versePanel = getActiveSlide();
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
    ayah.className = isArabic
      ? `font-naskh mt-3 text-base font-bold leading-[2.2] ${shareText} sm:text-lg`
      : isUrdu
        ? `font-urduHeader mt-3 text-base font-bold leading-7 ${shareText} sm:text-lg`
        : `mt-3 text-base font-bold leading-snug ${shareText} first-letter:uppercase sm:text-lg`;
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
    surah.className = `font-urduUi text-[10px] leading-relaxed ${shareMuted}`;
    surah.setAttribute("dir", "rtl");
    surah.textContent = arabicSurahName;

    root.append(ayah, divider, surah);
  }

  const foot = document.createElement("p");
  foot.className = `mt-5 text-center text-[10px] font-normal leading-snug ${shareMuted}`;
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
    backgroundColor: getShareCaptureBackground(),
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
  const versePanel = getActiveSlide();
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

const LANG_SWITCH_LOADER_MS = 180;
const VERSE_FONT_WAIT_MS = 8000;
let langSwitchToken = 0;
let langSwitchLoaderTimer = null;

function verseFontSample() {
  return "سُورَةُ یہ پ چ ٹ بِسۡمِ";
}

function preloadVerseFonts() {
  if (!document.fonts?.load) return;
  const sample = verseFontSample();
  void document.fonts.load('700 1.5rem "Noto Nastaliq Urdu"', sample);
  void document.fonts.load('400 1rem "Noto Nastaliq Urdu"', sample);
  void document.fonts.load('700 1.5rem "Amiri"', sample);
  void document.fonts.load('400 1rem "Amiri"', sample);
  void document.fonts.load('700 1.5rem "Noto Sans Arabic"', sample);
  void document.fonts.load('400 1rem "Noto Sans Arabic"', sample);
}

function ensureVerseFont() {
  if (!document.fonts?.load) return Promise.resolve();
  const sample = verseFontSample();
  const requests = isArabicEdition()
    ? [
        document.fonts.load('700 1.5rem "Amiri"', sample),
        document.fonts.load('400 1rem "Amiri"', sample),
      ]
    : isUrduEdition()
      ? [
          document.fonts.load('700 1.5rem "Noto Nastaliq Urdu"', sample),
          document.fonts.load('400 1rem "Noto Nastaliq Urdu"', sample),
        ]
      : [document.fonts.load('700 1.5rem "Mulish"', "Ayah")];
  return Promise.race([
    Promise.all(requests).catch(() => undefined),
    sleep(VERSE_FONT_WAIT_MS),
  ]);
}

function setVerseFontHold(held) {
  getSlides().forEach((slide) => {
    slide
      .querySelector(".reel-slide__verse")
      ?.classList.toggle("is-font-pending", held);
    slide
      .querySelector(".reel-slide__caption")
      ?.classList.toggle("is-font-pending", held);
  });
}

function showLangSwitchLoader() {
  const loader = document.getElementById("langSwitchLoader");
  if (loader) loader.hidden = false;
  setVerseFontHold(true);
  setReelScrollPaused(true);
}

function hideLangSwitchLoader() {
  if (langSwitchLoaderTimer) {
    clearTimeout(langSwitchLoaderTimer);
    langSwitchLoaderTimer = null;
  }
  const loader = document.getElementById("langSwitchLoader");
  if (loader) loader.hidden = true;
  setVerseFontHold(false);
  if (!isReelChromeOpen()) setReelScrollPaused(false);
}

async function handleLanguageChange(languageEdition) {
  const selectedLanguage = normalizeLanguage(languageEdition);
  if (selectedLanguage === currentLang) return;

  const token = ++langSwitchToken;
  currentLang = selectedLanguage;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang);
  pendingAyahData = null;
  feedAheadFailures = 0;
  syncLanguageMenuUI();
  updateLanguageDisplay({ paintSlides: false });

  if (langSwitchLoaderTimer) clearTimeout(langSwitchLoaderTimer);
  langSwitchLoaderTimer = setTimeout(() => {
    if (token === langSwitchToken) showLangSwitchLoader();
  }, LANG_SWITCH_LOADER_MS);

  try {
    const pairs = await fetchMountedSlideData();
    await ensureVerseFont();
    if (token !== langSwitchToken) return;
    paintMountedSlides(pairs);
    updateLanguageDisplay();
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  } finally {
    if (token === langSwitchToken) hideLangSwitchLoader();
  }
}

async function fetchMountedSlideData() {
  const slides = getSlides().filter(
    (slide) => slide.dataset.ayahNumber && slide.dataset.error !== "true",
  );
  return Promise.all(
    slides.map(async (slide) => ({
      slide,
      data: await fetchAyah(slide.dataset.ayahNumber),
    })),
  );
}

function paintMountedSlides(pairs) {
  pairs.forEach(({ slide, data }) => {
    if (data) fillSlide(slide, data);
  });
  syncActiveFromSlide(getActiveSlide());
  void ensureFeedAhead();
}

function updateLanguageDisplay({ paintSlides = true } = {}) {
  const {
    btn: shareBtn,
    tip: shareTooltip,
    label: shareTooltipLabel,
  } = getShareTooltipEls();
  closeShareTooltip();
  syncLanguageMenuUI();
  if (paintSlides) {
    getSlides().forEach((slide) => {
      applySlideLanguage(slide);
      fitSlideVerse(slide);
    });
  }

  document.documentElement.dir = "ltr";
  if (isUrduEdition()) {
    document.documentElement.lang = "ur-PK";
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
    document.documentElement.lang = "ar";
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

  document.documentElement.lang =
    currentLang === "ms.basmeih" ? "ms-MY" : "en-PK";
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

function reciteUrl(ayahNumber) {
  return `${RECITE_AUDIO_BASE}/${ayahNumber}.mp3`;
}

function bufferRatio(audio) {
  const duration = audio.duration;
  if (!Number.isFinite(duration) || duration <= 0) return null;
  if (!audio.buffered || audio.buffered.length === 0) return 0;
  let end = 0;
  for (let i = 0; i < audio.buffered.length; i += 1) {
    end = Math.max(end, audio.buffered.end(i));
  }
  return Math.max(0, Math.min(1, end / duration));
}

function setReciteUi(state, progress) {
  const wrap = document.querySelector(".recite-btn-wrap");
  const btn = document.getElementById("reciteBtn");
  if (!wrap || !btn) return;
  wrap.dataset.state = state;
  const label = RECITE_LABELS[state] || RECITE_LABELS.loading;
  btn.setAttribute("aria-label", label);
  btn.title = label;
  btn.setAttribute("aria-pressed", state === "playing" ? "true" : "false");
  const busy = state === "loading";
  btn.setAttribute("aria-busy", busy ? "true" : "false");
  btn.disabled = state === "loading" || state === "idle";
  const ring = wrap.querySelector(".recite-btn-ring__progress");
  if (state === "loading" && typeof progress !== "number") {
    wrap.classList.add("is-indeterminate");
    ring?.style.removeProperty("stroke-dashoffset");
    return;
  }
  wrap.classList.remove("is-indeterminate");
  if (ring && typeof progress === "number") {
    const amount = Math.max(0, Math.min(1, progress));
    ring.style.strokeDashoffset = `${RECITE_RING_LENGTH * (1 - amount)}px`;
  }
  if (state === "ready") maybeShowReciteHint();
  else if (state === "playing") dismissReciteHint({ persist: true });
  else dismissReciteHint();
}

function clearReciteLoadTimeout() {
  if (!reciteLoadTimeout) return;
  clearTimeout(reciteLoadTimeout);
  reciteLoadTimeout = null;
}

function stopRecitation() {
  if (reciteLoadTimer) {
    clearTimeout(reciteLoadTimer);
    reciteLoadTimer = null;
  }
  clearReciteLoadTimeout();
  reciteGeneration += 1;
  reciteTargetAyah = null;
  const audio = reciteAudio;
  reciteAudio = null;
  if (!audio) return;
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
}

function failRecitationLoad() {
  clearReciteLoadTimeout();
  reciteGeneration += 1;
  const audio = reciteAudio;
  reciteAudio = null;
  if (audio) {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  }
  setReciteUi("error");
}

function updateReciteProgress(audio) {
  const wrap = document.querySelector(".recite-btn-wrap");
  if (!wrap || wrap.dataset.state !== "loading") return;
  const amount = bufferRatio(audio);
  if (amount == null) setReciteUi("loading");
  else setReciteUi("loading", amount);
}

function attachRecitation(ayahNumber, generation) {
  const audio = new Audio();
  audio.preload = "auto";
  reciteAudio = audio;
  reciteTargetAyah = ayahNumber;

  const stillCurrent = () => generation === reciteGeneration;

  audio.addEventListener("progress", () => {
    if (stillCurrent()) updateReciteProgress(audio);
  });
  audio.addEventListener("loadedmetadata", () => {
    if (stillCurrent()) updateReciteProgress(audio);
  });
  audio.addEventListener("durationchange", () => {
    if (stillCurrent()) updateReciteProgress(audio);
  });
  audio.addEventListener("canplay", () => {
    if (!stillCurrent()) return;
    clearReciteLoadTimeout();
    setReciteUi("ready", 1);
  });
  audio.addEventListener("playing", () => {
    if (stillCurrent()) setReciteUi("playing");
  });
  audio.addEventListener("pause", () => {
    if (!stillCurrent() || audio.ended) return;
    setReciteUi("ready");
  });
  audio.addEventListener("ended", () => {
    if (stillCurrent()) setReciteUi("ready");
  });
  audio.addEventListener("error", () => {
    if (!stillCurrent()) return;
    clearReciteLoadTimeout();
    setReciteUi("error");
  });

  if (navigator.onLine === false) {
    setReciteUi("error");
    return;
  }

  audio.src = reciteUrl(ayahNumber);
  reciteLoadTimeout = window.setTimeout(() => {
    reciteLoadTimeout = null;
    if (!stillCurrent()) return;
    const wrap = document.querySelector(".recite-btn-wrap");
    if (wrap?.dataset.state !== "loading") return;
    failRecitationLoad();
  }, RECITE_LOAD_TIMEOUT_MS);
}

function queueRecitation(ayahNumber) {
  stopRecitation();
  reciteTargetAyah = ayahNumber;
  setReciteUi("loading");
  const generation = reciteGeneration;
  reciteLoadTimer = window.setTimeout(() => {
    reciteLoadTimer = null;
    if (generation !== reciteGeneration) return;
    attachRecitation(ayahNumber, generation);
  }, RECITE_SETTLE_MS);
}

function syncRecitationToSlide(slide) {
  const ayahNumber = Number(slide?.dataset.ayahNumber);
  const valid =
    slide &&
    slide.dataset.error !== "true" &&
    Number.isInteger(ayahNumber) &&
    ayahNumber >= 1 &&
    ayahNumber <= 6236;
  if (!valid) {
    stopRecitation();
    setReciteUi("idle");
    return;
  }
  if (ayahNumber === reciteTargetAyah && (reciteAudio || reciteLoadTimer)) return;
  queueRecitation(ayahNumber);
}

function hasSeenReciteHint() {
  return localStorage.getItem(RECITE_HINT_SEEN_KEY) === "1";
}

function markReciteHintSeen() {
  localStorage.setItem(RECITE_HINT_SEEN_KEY, "1");
}

function dismissReciteHint({ persist = false } = {}) {
  const hint = document.getElementById("reciteHint");
  const open = hint?.classList.contains("header-tooltip--open");
  if (!open && !reciteHintTimer) return;
  if (reciteHintTimer) {
    clearTimeout(reciteHintTimer);
    reciteHintTimer = null;
  }
  closeHeaderTooltip("reciteHint");
  document.getElementById("reciteBtn")?.removeAttribute("aria-describedby");
  document.getElementById("reciteBtn")?.classList.remove("recite-btn--pulse");
  document.removeEventListener("pointerdown", onReciteHintPointerDown);
  if (persist && open) markReciteHintSeen();
}

function onReciteHintPointerDown(event) {
  if (event.target instanceof Element && event.target.closest("#reciteBtn")) return;
  dismissReciteHint({ persist: true });
}

function openReciteHint() {
  if (hasSeenReciteHint()) return;
  const hint = document.getElementById("reciteHint");
  const btn = document.getElementById("reciteBtn");
  if (!hint || !btn || hint.classList.contains("header-tooltip--open")) return;
  openHeaderTooltip("reciteHint", RECITE_HINT_TEXT);
  btn.setAttribute("aria-describedby", "reciteHint");
  if (!prefersReducedMotion()) {
    btn.classList.remove("recite-btn--pulse");
    void btn.offsetWidth;
    btn.classList.add("recite-btn--pulse");
  }
  document.addEventListener("pointerdown", onReciteHintPointerDown);
  if (reciteHintTimer) clearTimeout(reciteHintTimer);
  reciteHintTimer = window.setTimeout(
    () => dismissReciteHint({ persist: true }),
    RECITE_HINT_MS,
  );
}

function maybeShowReciteHint() {
  if (hasSeenReciteHint()) return;
  if (headerWizardAbort && !headerWizardAbort.cancelled) {
    reciteHintWaitingForWizard = true;
    return;
  }
  openReciteHint();
}

function onReciteClick() {
  const state = document.querySelector(".recite-btn-wrap")?.dataset.state;
  if (state === "playing") {
    reciteAudio?.pause();
    return;
  }
  if (state === "ready") {
    const playAttempt = reciteAudio?.play();
    playAttempt?.catch(() => setReciteUi("error"));
    return;
  }
  if (state === "error" && Number.isInteger(reciteTargetAyah)) {
    queueRecitation(reciteTargetAyah);
  }
}

function updateSaveHeartState() {
  const btn = document.getElementById("saveAyahBtn");
  if (!btn) return;
  if (currentSurahNumber == null || currentAyahInSurah == null) {
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Save ayah");
    btn.title = "Save ayah";
    return;
  }
  const saved = isAyahSaved(currentSurahNumber, currentAyahInSurah);
  btn.setAttribute("aria-pressed", String(saved));
  const label = saved ? "Unsave ayah" : "Save ayah";
  btn.setAttribute("aria-label", label);
  btn.title = label;
}

const SAVE_HINT_MS = 2200;

function dismissSaveHint() {
  if (saveHintTimer) {
    clearTimeout(saveHintTimer);
    saveHintTimer = null;
  }
  closeHeaderTooltip("saveAyahHint");
  document.getElementById("saveAyahBtn")?.removeAttribute("aria-describedby");
  document.removeEventListener("pointerdown", onSaveHintPointerDown);
}

function onSaveHintPointerDown(event) {
  if (event.target instanceof Element && event.target.closest("#saveAyahBtn")) {
    return;
  }
  dismissSaveHint();
}

function showSaveHint(message) {
  const hint = document.getElementById("saveAyahHint");
  const btn = document.getElementById("saveAyahBtn");
  if (!hint || !btn) return;
  dismissSaveHint();
  openHeaderTooltip("saveAyahHint", message);
  btn.setAttribute("aria-describedby", "saveAyahHint");
  document.addEventListener("pointerdown", onSaveHintPointerDown);
  saveHintTimer = window.setTimeout(dismissSaveHint, SAVE_HINT_MS);
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
  const feed = getReelFeed();
  if (!feed) return;

  const existing = getSlides().find(
    (slide) =>
      slide.dataset.surahNumber === String(surah) &&
      slide.dataset.ayahInSurah === String(ayah),
  );
  if (existing) {
    existing.scrollIntoView({ block: "start" });
    return;
  }

  const data = await fetchAyah(`${surah}:${ayah}`);
  if (!data) {
    showSaveToast("Couldn't open that ayah. Please try again.");
    return;
  }

  const slide = createSlideShell();
  fillSlide(slide, data);
  const current = getActiveSlide();
  mountSlide(slide, current?.nextSibling || null);
  slide.scrollIntoView({ block: "start" });
}

function hasSeenHeaderWizard() {
  return localStorage.getItem(HEADER_WIZARD_SEEN_KEY) === "1";
}

function markHeaderWizardSeen() {
  localStorage.setItem(HEADER_WIZARD_SEEN_KEY, "1");
}

function closeHeaderTooltip(hintId) {
  const hint = document.getElementById(hintId);
  if (!hint) return;
  hint.classList.remove("header-tooltip--open");
  hint.setAttribute("hidden", "");
  hint.setAttribute("aria-hidden", "true");
}

function closeAllHeaderTooltips() {
  HEADER_WIZARD_STEPS.forEach(({ hintId }) => closeHeaderTooltip(hintId));
  document
    .getElementById("savedMenuTrigger")
    ?.classList.remove("saved-menu-trigger--pulse");
}

function openHeaderTooltip(hintId, text) {
  const hint = document.getElementById(hintId);
  if (!hint) return;
  hint.textContent = text;
  hint.removeAttribute("hidden");
  hint.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    if (hint.hasAttribute("hidden")) return;
    hint.classList.add("header-tooltip--open");
  });
}

function waitForHeaderTooltipFade() {
  return sleep(WIZARD_FADE_MS);
}

function pulseHeaderWizardTarget(targetId) {
  if (prefersReducedMotion()) return;
  const target = document.getElementById(targetId);
  if (!target) return;
  if (targetId === "savedMenuTrigger") {
    pulseSavedMenuTrigger();
    return;
  }
  target.classList.remove("header-icon-btn--pulse");
  void target.offsetWidth;
  target.classList.add("header-icon-btn--pulse");
  target.addEventListener(
    "animationend",
    () => target.classList.remove("header-icon-btn--pulse"),
    { once: true },
  );
}

function cancelHeaderWizard() {
  if (!headerWizardAbort || headerWizardAbort.cancelled) return;
  headerWizardAbort.cancelled = true;
  closeAllHeaderTooltips();
  markHeaderWizardSeen();
}

async function runHeaderWizard() {
  if (hasSeenHeaderWizard()) return;

  const abort = { cancelled: false };
  headerWizardAbort = abort;

  const dismiss = () => cancelHeaderWizard();
  document.addEventListener("pointerdown", dismiss);
  document.addEventListener("keydown", dismiss);

  try {
    await sleep(WIZARD_START_DELAY_MS);
    if (abort.cancelled) return;

    for (const step of HEADER_WIZARD_STEPS) {
      if (abort.cancelled) return;
      closeAllHeaderTooltips();
      openHeaderTooltip(step.hintId, step.text);
      pulseHeaderWizardTarget(step.pulseTargetId);
      await waitForHeaderTooltipFade();
      if (abort.cancelled) return;
      await sleep(WIZARD_STEP_VISIBLE_MS);
      if (abort.cancelled) return;
      closeHeaderTooltip(step.hintId);
      await waitForHeaderTooltipFade();
    }

    if (!abort.cancelled) {
      markHeaderWizardSeen();
    }
  } finally {
    document.removeEventListener("pointerdown", dismiss);
    document.removeEventListener("keydown", dismiss);
    headerWizardAbort = null;
    if (reciteHintWaitingForWizard) {
      reciteHintWaitingForWizard = false;
      if (document.querySelector(".recite-btn-wrap")?.dataset.state === "ready") {
        maybeShowReciteHint();
      }
    }
  }
}

function initHeaderWizard() {
  window.addEventListener(
    "scroll",
    () => {
      if (
        HEADER_WIZARD_STEPS.some(({ hintId }) =>
          document
            .getElementById(hintId)
            ?.classList.contains("header-tooltip--open"),
        )
      ) {
        cancelHeaderWizard();
      }
    },
    true,
  );
  void runHeaderWizard();
}

function animateSaveAyahHeart() {
  if (prefersReducedMotion()) return;
  const btn = document.getElementById("saveAyahBtn");
  if (!btn) return;
  btn.classList.remove("save-ayah-btn--pop");
  void btn.offsetWidth;
  btn.classList.add("save-ayah-btn--pop");
  btn.addEventListener(
    "animationend",
    () => btn.classList.remove("save-ayah-btn--pop"),
    { once: true },
  );
}

function pulseSavedMenuTrigger() {
  if (prefersReducedMotion()) return;
  const trigger = document.getElementById("savedMenuTrigger");
  if (!trigger) return;
  trigger.classList.remove("saved-menu-trigger--pulse");
  void trigger.offsetWidth;
  trigger.classList.add("saved-menu-trigger--pulse");
  trigger.addEventListener(
    "animationend",
    () => trigger.classList.remove("saved-menu-trigger--pulse"),
    { once: true },
  );
}

function openSavedMenu() {
  const menu = document.getElementById("saved-menu");
  const trigger = document.getElementById("savedMenuTrigger");
  const dropdown = document.getElementById("savedMenuDropdown");
  if (!menu || !trigger || !dropdown) return;
  closeMoreMenu();
  closeLanguageMenu();
  closeHeaderTooltip("savedMenuHint");
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
    dismissSaveHint();
    return;
  }

  if (saved.length >= MAX_SAVED_AYAHS) {
    showSaveToast("Limit reached. Unsave an ayah to add a new one.");
    return;
  }

  saved.push({ surah: currentSurahNumber, ayah: currentAyahInSurah });
  persistSavedAyahs(saved);
  updateSaveHeartState();
  animateSaveAyahHeart();
  renderSavedReflectionsList();
  showSaveHint("Ayah saved");
}

function initSavedAyahs() {
  const saveBtn = document.getElementById("saveAyahBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleSaveCurrentAyah();
    });
  }
  getReelFeed()?.addEventListener("scroll", () => dismissSaveHint(), {
    passive: true,
  });

  const savedMenuTrigger = document.getElementById("savedMenuTrigger");
  if (savedMenuTrigger) {
    savedMenuTrigger.addEventListener("click", (event) => {
      event.stopPropagation();
      closeHeaderTooltip("savedMenuHint");
      toggleSavedMenu();
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (document.getElementById("savedMenuHint")?.classList.contains(
        "header-tooltip--open",
      )) {
        closeHeaderTooltip("savedMenuHint");
      }
    },
    true,
  );

  renderSavedReflectionsList();
}
