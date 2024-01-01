let currentLang = "en.asad";
let currentAyahNumber = Math.floor(Math.random() * 6236) + 1;
let previousAyahNumber = null; // Store the last Ayah number viewed
let touchstartX = 0;
let touchendX = 0;
const minSwipeDistance = 30;

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

let ayahHistory = [];
let historyIndex = 0; // Track the current position in the history

document.addEventListener("DOMContentLoaded", () => {
  fetchAyah();
  document
    .getElementById("saveImageBtn")
    .addEventListener("click", saveAsImage);
  document
    .getElementById("shareBtn")
    .addEventListener("click", shareOnWhatsApp);
  document.getElementById("nextBtn").addEventListener("click", fetchNewVerse);
  const prevBtn = document.getElementById("prevBtn");
  prevBtn.classList.add("disabled"); // Disable by default
  prevBtn.addEventListener("click", fetchPrevVerse);
  document
    .getElementById("langToggleBtn")
    .addEventListener("click", toggleLanguage);

  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    document.getElementById("swipeInstruction").style.display = "flex";
  } else {
    document.getElementById("swipeInstruction").style.display = "none";
  }

  const verseDisplay = document.getElementById("verseDisplay");
  verseDisplay.addEventListener(
    "touchstart",
    (e) => {
      touchstartX = e.changedTouches[0].screenX;
    },
    false
  );

  verseDisplay.addEventListener(
    "touchend",
    (e) => {
      touchendX = e.changedTouches[0].screenX;
      handleGesture();
    },
    false
  );
});

function handleGesture() {
  const distance = touchendX - touchstartX;

  if (Math.abs(distance) > minSwipeDistance) {
    if (distance < 0) {
      fetchNewVerse();
    } else if (distance > 0) {
      fetchPrevVerse();
    }
  }
}

async function fetchAyah() {
  const url = `https://al-qur-an-all-translations.p.rapidapi.com/v1/ayah/${currentAyahNumber}/${currentLang}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b3c57eb87amshbab2ddabc510d80p1d343bjsn74bf4f16e4f5",
      "X-RapidAPI-Host": "al-qur-an-all-translations.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    displayVerse(data);
  } catch (error) {
    console.error("Error fetching verse:", error);
  }
}

function fetchNewVerse() {
  previousAyahNumber = currentAyahNumber; // Store the current Ayah
  currentAyahNumber = Math.floor(Math.random() * 6236) + 1;
  fetchAyah();
  document.getElementById("prevBtn").classList.remove("disabled");
}

function fetchPrevVerse() {
  if (previousAyahNumber !== null) {
    currentAyahNumber = previousAyahNumber;
    previousAyahNumber = null; // Reset the previous Ayah
    fetchAyah();
    document.getElementById("prevBtn").classList.add("disabled");
  } else {
    console.log("No previous Ayah available.");
  }
}

function displayVerse(data) {
  const verseText = data.data.text;
  const surahInfo = data.data.surah;

  const surahDetails = `
        ${surahInfo.name} (${surahInfo.englishName}, ${surahInfo.englishNameTranslation})
        <br>
        ${surahInfo.revelationType}
    `;

  const verseDisplay = document.getElementById("verseDisplay");
  verseDisplay.innerHTML = `<p class="verse">${verseText}</p><small class="surah">${surahDetails}</small>`;
  changeBackgroundImage();
}

function changeBackgroundImage() {
  const randomImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  document.body.style.backgroundImage = randomImage;
}

function saveAsImage() {
  // Elements to hide before capture
  const elementsToHide = document.querySelectorAll(".element-to-hide");

  // Hide the elements
  elementsToHide.forEach((el) => (el.style.visibility = "hidden"));

  setTimeout(() => {
    html2canvas(document.body, { allowTaint: true, useCORS: true }).then(
      (canvas) => {
        // Show the elements again
        elementsToHide.forEach((el) => (el.style.visibility = ""));

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        const timestamp = new Date().toISOString().replace(/[\W_]+/g, "");
        link.download = `Ayah-${timestamp}.png`;
        link.click();
      }
    );
  }, 500);
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

  if (currentLang === "en.asad") {
    currentLang = "ur.maududi";
    verseDisplay.classList.add("urdu-style");
    document.getElementById("langToggleBtn").innerText = "English";
  } else {
    currentLang = "en.asad";
    verseDisplay.classList.remove("urdu-style");
    document.getElementById("langToggleBtn").innerText = "اُردُو";
  }

  fetchAyah();
}
