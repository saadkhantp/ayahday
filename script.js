let currentLang = "en.asad"; 
let currentAyahNumber = 1;
let touchstartX = 0;
let touchendX = 0;
const minSwipeDistance = 30; // Minimum distance to consider a swipe

// const verseDisplay = document.getElementById('verseDisplay');

// verseDisplay.addEventListener('touchstart', e => {
//     touchstartX = e.changedTouches[0].screenX;
// }, false);

// verseDisplay.addEventListener('touchend', e => {
//     touchendX = e.changedTouches[0].screenX;
//     handleGesture();
// }, false);

const bodyElement = document.body;

bodyElement.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
}, false);

bodyElement.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
}, false);

function handleGesture() {
    const distance = touchendX - touchstartX;

    if (Math.abs(distance) > minSwipeDistance) {
        if (distance < 0) {
            fetchNewVerse(); // Left swipe detected
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRandomVerse();
  document
    .getElementById("saveImageBtn")
    .addEventListener("click", saveAsImage);
  document
    .getElementById("shareBtn")
    .addEventListener("click", shareOnWhatsApp);
  document.getElementById("nextBtn").addEventListener("click", fetchNewVerse); // For fetching a new verse
  document
    .getElementById("langToggleBtn")
    .addEventListener("click", toggleLanguage); // Language toggle button

    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.getElementById("swipeInstruction").style.display = "flex";
    } else {
        document.getElementById("swipeInstruction").style.display = "none";
    }
});

async function fetchRandomVerse() {
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
  currentAyahNumber = Math.floor(Math.random() * 6236) + 1; // Random ayah number
  fetchRandomVerse();
}

function displayVerse(data) {
  const verseText = data.data.text;
  const surahInfo = data.data.surah;

  const surahDetails = `
        ${surahInfo.name} (${surahInfo.englishName}, ${surahInfo.englishNameTranslation})
        <br>
        ${surahInfo.revelationType}
    `;

  document.getElementById(
    "verseDisplay"
  ).innerHTML = `<p class="verse">${verseText}</p><small>${surahDetails}</small>`;
}


function saveAsImage() {
  const verseDiv = document.getElementById("verseDisplay");
  html2canvas(verseDiv).then((canvas) => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;

    // Generate a unique filename using the current timestamp
    const timestamp = new Date().toISOString().replace(/[\W_]+/g, "");
    link.download = `Ayah-${timestamp}.png`;

    link.click();
  });
}

function shareOnWhatsApp() {
  const verseText = encodeURIComponent(
    document.getElementById("verseDisplay").innerText
  );
  const appUrl = "https://ayahday.cc"; // Your app's URL
  const whatsappMessage = `${verseText}%0A%0AExplore more at ${appUrl}`; // Append the app URL to the message

  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
  window.open(whatsappUrl, "_blank");
}

function toggleLanguage() {
  currentLang = currentLang === "en.asad" ? "ur.maududi" : "en.asad"; // Toggle language
  fetchRandomVerse(); // Fetch the same Ayah in the new language

  // Update button text to reflect the current language
  document.getElementById("langToggleBtn").innerText =
    currentLang === "en.asad" ? "اُردُو" : "English";
}
