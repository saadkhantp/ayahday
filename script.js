let currentLang = "en.asad";
let currentAyahNumber = getRandomAyahNumber();
let previousAyahNumber = null;
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
});

async function fetchAndDisplayAyah(ayahNumber) {
  const data = await fetchAyah(ayahNumber);
  displayVerse(data);
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching verse:", error);
  }
}

function displayVerse(data) {
  const verseText = data.data.text;
  const surahInfo = data.data.surah;
  const surahDetails = `${surahInfo.name} (${surahInfo.englishName}, ${surahInfo.englishNameTranslation})<br>${surahInfo.revelationType}`;
  const verseDisplay = document.getElementById("verseDisplay");
  verseDisplay.innerHTML = `<p class="verse">${verseText}</p><small class="surah">${surahDetails}</small>`;
  changeBackgroundImage();
}

function changeBackgroundImage() {
  const backgroundImages = [
    "url('./images/sky-1.jpg')",
    "url('./images/sky-2.jpg')",
    "url('./images/sky-3.jpg')",
    "url('./images/sky-4.jpg')",
    "url('./images/sky-5.jpg')",
    "url('./images/sky-6.jpg')",
    "url('./images/sky-7.jpg')",
    "url('./images/sky-8.jpg')",
    "url('./images/sky-9.jpg')",
    "url('./images/sky-10.jpg')",
    "url('./images/sky-11.jpg')",
  ];
  const randomImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  document.body.style.backgroundImage = randomImage;
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
  const verseDisplay = document.getElementById("verseDisplay");
  console.log("Current language before toggle:", currentLang); // Add this
  if (currentLang === "en.asad") {
    currentLang = "ur.maududi";
    verseDisplay.classList.add("urdu-style");
    document.getElementById("langToggleBtn").innerText = "English";
  } else {
    currentLang = "en.asad";
    verseDisplay.classList.remove("urdu-style");
    document.getElementById("langToggleBtn").innerText = "اُردُو";
  }
  console.log("Current language after toggle:", currentLang); // Add this
  console.log("fetchAndDisplayAyah function:", fetchAndDisplayAyah); // Add this
  fetchAndDisplayAyah(currentAyahNumber);
}

function fetchPrevVerse() {
  if (previousAyahNumber !== null) {
    currentAyahNumber = previousAyahNumber;
    previousAyahNumber = null; // Reset the previous Ayah
    fetchAndDisplayAyah(currentAyahNumber);
    document.getElementById("prevBtn").classList.add("disabled");
  } else {
    console.log("No previous Ayah available.");
  }
}
async function fetchNewVerse() {
  previousAyahNumber = currentAyahNumber; // Store the current Ayah
  currentAyahNumber = getRandomAyahNumber();
  displayVerse(nextAyahData);
  nextAyahData = await fetchAyah(currentAyahNumber); // Wait for the promise to resolve
  if (previousAyahNumber !== null) {
    document.getElementById("prevBtn").classList.remove("disabled");
  }
  document.getElementById("verseDisplay").classList.add("fade-in");
}

function updateDateTime() {
  const date = new Date();
  const day = date
    .toLocaleDateString(undefined, { weekday: "long" })
    .slice(0, 3);
  const month = date.toLocaleDateString(undefined, { month: "long" });
  const year = date.getFullYear().toString().slice(2); // Get the last two digits of the year
  const dateNum = date.getDate();

  const dateString = `${day}, ${dateNum} ${month} '${year}`;

  document.getElementById("datetime").textContent = dateString;
}

updateDateTime();
setInterval(updateDateTime, 60000); // Update every minute
