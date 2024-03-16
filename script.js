let currentLang = localStorage.getItem("currentLang") || "en.asad";
let currentAyahNumber = getRandomAyahNumber();
let ayahHistory = [];
let touchstartX = 0;
let touchendX = 0;
const minSwipeDistance = 30;
let nextAyahData = null;

const API_CONFIG = {
  url: "https://al-qur-an-all-translations.p.rapidapi.com/v1/ayah",
  headers: {
    "X-RapidAPI-Key": "b3c57eb87amshbab2ddabc510d80p1d343bjsn74bf4f16e4f5",
    "X-RapidAPI-Host": "al-qur-an-all-translations.p.rapidapi.com",
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await fetchAndDisplayAyah(currentAyahNumber);
  nextAyahData = await fetchAyah(getRandomAyahNumber());
  addEventListeners();
  updateLanguageDisplay();
});

async function fetchAndDisplayAyah(ayahNumber) {
  const data = await fetchAyah(ayahNumber);
  if (data) displayVerse(data);
}

async function fetchAyah(ayahNumber) {
  const options = {
    method: "GET",
    headers: API_CONFIG.headers,
  };

  try {
    const response = await fetch(
      `${API_CONFIG.url}/${ayahNumber}/${currentLang}`,
      options
    );
    if (!response.ok) throw new Error("Failed to fetch Ayah");
    const data = await response.json();
    return data;
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
  document
    .getElementById("langToggleBtn")
    .addEventListener("click", toggleLanguage);
  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchend", handleTouchEnd, false);
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
    { once: true }
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
    { once: true }
  );
}

function shareOnWhatsApp() {
  const verseText = encodeURIComponent(
    document.getElementById("verseDisplay").innerText
  );
  const appUrl = "https://ayahday.cc";
  const whatsappMessage = `${verseText}%0A%0AExplore more at ${appUrl}`;
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
  window.open(whatsappUrl, "_blank");
}

function toggleLanguage() {
  if (currentLang === "en.asad") {
    currentLang = "ur.maududi";
  } else {
    currentLang = "en.asad";
  }
  localStorage.setItem("currentLang", currentLang);
  updateLanguageDisplay();
  fetchAndDisplayAyah(currentAyahNumber);
}

function updateLanguageDisplay() {
  const verseDisplay = document.getElementById("verseDisplay");
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (currentLang === "ur.maududi") {
    verseDisplay.classList.add("urdu-style");
    langToggleBtn.innerHTML = "English";
  } else {
    verseDisplay.classList.remove("urdu-style");
    langToggleBtn.innerHTML =
      "<span style='font-family: Noto Nastaliq Urdu;'>اردو</span>";
  }
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

document.getElementById("saveImageBtn").addEventListener("click", function () {
  const elementsToHide = document.querySelectorAll(".element-to-hide");
  elementsToHide.forEach((element) => {
    element.style.display = "none";
  });

  document.getElementById("gradientLogo").style.display = "none";
  document.getElementById("screenshotLogo").style.display = "block";

  html2canvas(document.body, {
    backgroundColor: "#29292d", // Set your desired background color here
  }).then(function (canvas) {
    elementsToHide.forEach((element) => {
      element.style.display = "flex";
    });

    document.getElementById("gradientLogo").style.display = "block";
    document.getElementById("screenshotLogo").style.display = "none";

    const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
    const fileName = `ayah-${currentAyahNumber}-${timestamp}.png`;

    var link = document.createElement("a");
    link.download = fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

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
