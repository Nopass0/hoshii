import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Импорт всех JSON-файлов из папки locales
const locales = import.meta.glob("./locales/**/*.json", { eager: true });

const resources = Object.keys(locales).reduce(
  (acc, path) => {
    const match = path.match(/\.\/locales\/(.+)\/translation\.json/); // Извлекаем название языка
    if (match) {
      const lang = match[1]; // Например, "en" или "ru"
      acc[lang] = { translation: locales[path] };
    }
    return acc;
  },
  {} as Record<string, { translation: any }>,
);

console.log(resources);

i18n
  .use(LanguageDetector) // Определение языка браузера
  .use(initReactI18next) // Инициализация react-i18next
  .init({
    resources,
    fallbackLng: "en", // Язык по умолчанию
    interpolation: {
      escapeValue: false, // Не экранировать HTML
    },
    detection: {
      order: ["localStorage", "navigator"], // Сначала проверяем localStorage, затем язык браузера
      caches: ["localStorage"], // Сохраняем язык в localStorage
    },
  });

export default i18n;
