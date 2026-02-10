let currentLang = localStorage.getItem("lang") || "pl";
const langToggle = document.getElementById("langToggle");

langToggle.checked = currentLang === "en";

// Funkcja do ładowania języka
async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const keys = el.dataset.i18n.split(".");
        let value = translations;
        keys.forEach(k => value = value[k]);
        el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const keys = el.dataset.i18nPlaceholder.split(".");
        let value = translations;
        keys.forEach(k => value = value[k]);
        el.placeholder = value;
    });
}

// Zmiana języka po kliknięciu switcha
langToggle.addEventListener("change", () => {
    if (langToggle.checked) {
        setLanguage("en");
    } else {
        setLanguage("pl");
    }
});

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    loadLanguage(lang);
}

loadLanguage(currentLang);