document.addEventListener("DOMContentLoaded", () => {
  fetchRandomVerse();
  document
    .getElementById("saveImageBtn")
    .addEventListener("click", saveAsImage);
  document
    .getElementById("shareBtn")
    .addEventListener("click", shareOnWhatsApp);
  document
    .getElementById("nextBtn")
    .addEventListener("click", fetchRandomVerse); // Add this if you have a next button
});

async function fetchRandomVerse() {
  const ayahNumber = Math.floor(Math.random() * 6236) + 1; // Random ayah number
  const url = `https://al-qur-an-all-translations.p.rapidapi.com/v1/ayah/${ayahNumber}/en.asad`;
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

function displayVerse(data) {
  // Display the verse
  const verseText = data.data.text;
  const surahInfo = data.data.surah;

  // Construct the Surah information string
  const surahDetails = `
      ${surahInfo.name} (${surahInfo.englishName}, ${surahInfo.englishNameTranslation})
      <br>
      ${surahInfo.revelationType}
    
  `;

  // Update the innerHTML of the verseDisplay element
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
    const timestamp = new Date().toISOString().replace(/[\W_]+/g, ""); // ISO string with non-alphanumeric characters removed
    link.download = `Ayah-${timestamp}.png`;

    link.click();
  });
}

function shareOnWhatsApp() {
  const text = encodeURIComponent(
    document.getElementById("verseDisplay").innerText
  );
  const whatsappUrl = `https://wa.me/?text=${text}`;
  window.open(whatsappUrl, "_blank");
}
