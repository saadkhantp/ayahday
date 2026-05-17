const DEFAULT_LANGUAGE = "en.asad";
const LANGUAGE_STORAGE_KEY = "currentLang";
const SUPPORTED_LANGUAGE_EDITIONS = ["en.asad", "ur.maududi", "ms.basmeih"];
const LANGUAGE_LABELS = {
  "en.asad": "English",
  "ur.maududi": "Urdu",
  "ms.basmeih": "Malay",
};
const WHATS_NEW_APP_VERSION = "1.0.0";
const WHATS_NEW_RELEASE_ID = "malay-language";
const WHATS_NEW_STORAGE_KEY = `ayahday-whats-new-dismissed-${WHATS_NEW_APP_VERSION}-${WHATS_NEW_RELEASE_ID}`;

let currentLang = normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
let currentAyahNumber = getRandomAyahNumber();
let ayahHistory = [];
let touchstartX = 0;
let touchendX = 0;
const minSwipeDistance = 30;
let nextAyahData = null;

const API_CONFIG = {
  url: "https://api.alquran.cloud/v1/ayah",
};

const SHARE_TOOLTIP_MS = 3000;
let shareTooltipHideTimer = null;

document.addEventListener("DOMContentLoaded", async () => {
  initLanguageSelect();
  initWhatsNewNotice();
  await fetchAndDisplayAyah(currentAyahNumber);
  nextAyahData = await fetchAyah(getRandomAyahNumber());
  addEventListeners();
  initShareTooltip();
  updateLanguageDisplay();
});

async function fetchAndDisplayAyah(ayahNumber) {
  const data = await fetchAyah(ayahNumber);
  if (data) displayVerse(data);
}

async function fetchAyah(ayahNumber) {
  try {
    const arabicResponse = await fetch(
      `${API_CONFIG.url}/${ayahNumber}/quran-uthmani`,
    );

    const translationResponse = await fetch(
      `${API_CONFIG.url}/${ayahNumber}/${currentLang}`,
    );

    if (!arabicResponse.ok || !translationResponse.ok)
      throw new Error("Failed to fetch Ayah");

    const arabicData = await arabicResponse.json();
    const translationData = await translationResponse.json();

    return {
      data: {
        text: translationData.data.text,
        surah: {
          name: arabicData.data.surah.name,
          englishName: arabicData.data.surah.englishName,
          englishNameTranslation: arabicData.data.surah.englishNameTranslation,
          revelationType: arabicData.data.surah.revelationType,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching verse:", error);
    displayError("Error fetching verse. Please try again later.");
    return null;
  }
}

function displayVerse(data) {
  if (!data) return;
  const verseText = data.data.text;
  const surahInfo = data.data.surah;
  const surahDetails = `${surahInfo.name} (${surahInfo.englishName}, ${surahInfo.englishNameTranslation})<br>${surahInfo.revelationType}`;
  const verseDisplay = document.getElementById("verseDisplay");
  verseDisplay.innerHTML = `<p class="verse">${verseText}</p><small class="surah">${surahDetails}</small>`;
}

function getRandomAyahNumber() {
  return Math.floor(Math.random() * 6236) + 1;
}

function addEventListeners() {
  document
    .getElementById("shareBtn")
    .addEventListener("click", shareOnWhatsApp);
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
    if (!languageMenu || languageMenu.contains(event.target)) return;
    closeLanguageMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLanguageMenu();
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

function getWhatsNewCopy() {
  if (currentLang === "ur.maududi") {
    return {
      title: "نیا کیا ہے",
      message:
        "نیا: لینگویج مینیو میں ملے ترجمہ (ms.basmeih) شامل کر دیا گیا ہے۔",
      close: "بند کریں",
    };
  }
  if (currentLang === "ms.basmeih") {
    return {
      title: "Apa Baharu",
      message:
        "Baharu: Terjemahan Melayu (ms.basmeih) kini tersedia dalam menu bahasa.",
      close: "Tutup",
    };
  }
  return {
    title: "What's New",
    message: "New: Added Malay translation (ms.basmeih) in Language menu.",
    close: "Close",
  };
}

function initWhatsNewNotice() {
  const whatsNewNotice = document.getElementById("whatsNewNotice");
  const closeBtn = document.getElementById("closeWhatsNewBtn");
  if (!whatsNewNotice || !closeBtn) return;

  const isDismissed = localStorage.getItem(WHATS_NEW_STORAGE_KEY) === "1";
  whatsNewNotice.hidden = isDismissed;
  updateWhatsNewNoticeCopy();

  closeBtn.addEventListener("click", () => {
    localStorage.setItem(WHATS_NEW_STORAGE_KEY, "1");
    whatsNewNotice.hidden = true;
  });
}

function updateWhatsNewNoticeCopy() {
  const whatsNewNotice = document.getElementById("whatsNewNotice");
  const titleEl = document.getElementById("whatsNewTitle");
  const messageEl = document.getElementById("whatsNewMessage");
  const closeBtn = document.getElementById("closeWhatsNewBtn");
  if (!whatsNewNotice || !titleEl || !messageEl || !closeBtn) return;

  const copy = getWhatsNewCopy();
  titleEl.textContent = copy.title;
  messageEl.textContent = copy.message;
  closeBtn.setAttribute("aria-label", copy.close);
  closeBtn.setAttribute("title", copy.close);

  if (currentLang === "ur.maududi") {
    whatsNewNotice.classList.add("font-urduUi", "leading-8");
    whatsNewNotice.setAttribute("dir", "rtl");
  } else {
    whatsNewNotice.classList.remove("font-urduUi", "leading-8");
    whatsNewNotice.setAttribute("dir", "ltr");
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

function displayError(message) {
  const verseDisplay = document.getElementById("verseDisplay");
  verseDisplay.innerHTML = `<p class="error">${message}</p>`;
}

function handleGesture() {
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
  .addEventListener("animationend", async () => {
    const verseDisplay = document.getElementById("verseDisplay");
    if (verseDisplay.classList.contains("swipe-left")) {
      await fetchNewVerse();
      verseDisplay.classList.remove("swipe-left");
    } else if (verseDisplay.classList.contains("swipe-right")) {
      fetchPrevVerse();
      verseDisplay.classList.remove("swipe-right");
    }
  });

function swipeLeft(verseDisplay) {
  verseDisplay.classList.add("swipe-left");
  verseDisplay.addEventListener(
    "animationend",
    async () => {
      verseDisplay.classList.remove("swipe-left");
      await fetchNewVerse();
    },
    { once: true },
  );
}

function swipeRight(verseDisplay) {
  verseDisplay.classList.add("swipe-right");
  verseDisplay.addEventListener(
    "animationend",
    () => {
      verseDisplay.classList.remove("swipe-right");
      fetchPrevVerse();
    },
    { once: true },
  );
}

function shareOnWhatsApp() {
  const verseText = encodeURIComponent(
    document.getElementById("verseDisplay").innerText,
  );
  const appUrl = "https://www.ayahday.cc/";
  const whatsappMessage = `${verseText}%0A%0AExplore more at ${appUrl}`;
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
  window.open(whatsappUrl, "_blank");
}

function handleLanguageChange(languageEdition) {
  const selectedLanguage = normalizeLanguage(languageEdition);
  if (selectedLanguage === currentLang) return;

  currentLang = selectedLanguage;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang);
  syncLanguageMenuUI();
  updateLanguageDisplay();
  fetchAndDisplayAyah(currentAyahNumber);
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
  const isUrdu = currentLang === "ur.maududi";
  const isMalay = currentLang === "ms.basmeih";

  if (isUrdu) {
    verseDisplay.classList.add("urdu-style");
    verseDisplay.setAttribute("dir", "rtl");
    document.documentElement.lang = "ur-PK";
    document.documentElement.dir = "rtl";
    if (tagline) {
      tagline.className =
        "element-to-hide mt-0.5 font-urduHeader text-sm font-medium leading-8 text-solar-gold/95";
      tagline.textContent = "انگریزی، اردو اور مالے میں روزانہ کی آیات";
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
    updateWhatsNewNoticeCopy();
    return;
  }

  verseDisplay.classList.remove("urdu-style");
  verseDisplay.setAttribute("dir", "ltr");
  document.documentElement.lang = isMalay ? "ms-MY" : "en-PK";
  document.documentElement.dir = "ltr";
  if (tagline) {
    tagline.className =
      "element-to-hide mt-0.5 text-xs font-medium text-solar-gold/95";
    tagline.textContent = "Daily Quranic verses in English, Urdu & Malay";
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
  updateWhatsNewNoticeCopy();
}

async function fetchNewVerse() {
  ayahHistory.push(currentAyahNumber);
  currentAyahNumber = getRandomAyahNumber();
  const data = await fetchAyah(currentAyahNumber);
  if (data) {
    displayVerse(data);
    nextAyahData = await fetchAyah(getRandomAyahNumber());
  }
  updatePrevButtonState();
}

function fetchPrevVerse() {
  if (ayahHistory.length > 0) {
    currentAyahNumber = ayahHistory.pop();
    fetchAndDisplayAyah(currentAyahNumber);
    updatePrevButtonState();
  } else {
    console.log("No previous Ayah available.");
  }
}

function updatePrevButtonState() {
  const prevBtn = document.getElementById("prevBtn");
  if (ayahHistory.length > 0) {
    prevBtn.classList.remove("disabled");
  } else {
    prevBtn.classList.add("disabled");
  }
}

const saveImageBtn = document.getElementById("saveImageBtn");
if (saveImageBtn) {
  saveImageBtn.addEventListener("click", function () {
    const elementsToHide = document.querySelectorAll(".element-to-hide");
    elementsToHide.forEach((element) => {
      element.style.display = "none";
    });

    document.getElementById("gradientLogo").style.display = "none";
    document.getElementById("screenshotLogo").classList.remove("hidden");
    document.getElementById("screenshotLogo").style.display = "block";

    html2canvas(document.documentElement, {
      backgroundColor: "#020617",
      scale: 1,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    }).then(function (canvas) {
      elementsToHide.forEach((element) => {
        element.style.display = "";
      });

      document.getElementById("gradientLogo").style.display = "";
      document.getElementById("screenshotLogo").style.display = "none";
      document.getElementById("screenshotLogo").classList.add("hidden");

      const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
      const fileName = `ayah-${currentAyahNumber}-${timestamp}.png`;

      var link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
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
