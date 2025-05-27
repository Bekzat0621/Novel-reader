
let currentLang = 'ru';
function toggleLanguage() {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  document.getElementById("langLabel").textContent = currentLang === 'ru' ? "Русский" : "English";
}
