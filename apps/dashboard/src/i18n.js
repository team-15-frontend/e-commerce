import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./Translations/ar.json";
import de from "./Translations/de.json";
import en from "./Translations/en.json";
import fr from "./Translations/fr.json";
import ko from "./Translations/ko.json";


i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: ar,
    },
    de: {
      translation: de,
    },
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
    ko: {
      translation: ko,
    },
  },

  lng: "ar",

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
