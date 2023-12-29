let currentLang = "en.asad"; 
let currentAyahNumber =  Math.floor(Math.random() * 6236) + 1;;
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
  "url('./images/sky-11.jpg')"
];

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
            fetchNewVerse(); 
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
  ).innerHTML = `<p class="verse">${verseText}</p><small class="surah">${surahDetails}</small>`;

  changeBackgroundImage(); // Change background image with each new Ayah
}

function changeBackgroundImage() {
  const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  const verseDisplayElement = document.getElementById("verseDisplay");
  verseDisplayElement.style.backgroundImage = randomImage;
}

function saveAsImage() {
  const verseDiv = document.getElementById("verseDisplay");
  setTimeout(() => {
    html2canvas(verseDiv, {allowTaint: true}).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      const timestamp = new Date().toISOString().replace(/[\W_]+/g, "");
      link.download = `Ayah-${timestamp}.png`;
      link.click();
    });
  }, 500);
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
  const verseDisplay = document.getElementById("verseDisplay");

  if (currentLang === "en.asad") {
      currentLang = "ur.maududi";
      verseDisplay.classList.add("urdu-style"); // Add Urdu-specific styles
      document.getElementById("langToggleBtn").innerText = "English";
  } else {
      currentLang = "en.asad";
      verseDisplay.classList.remove("urdu-style"); // Remove Urdu-specific styles
      document.getElementById("langToggleBtn").innerText = "اُردُو";
  }

  fetchRandomVerse(); // Fetch the same Ayah in the new language
}
