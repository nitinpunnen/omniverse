import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationHE from "./locales/hn/translation.json";
import translationES from "./locales/es/translation.json";
import translationDE from "./locales/de/translation.json";

//Creating object with the variables of imported translation files
const resources = {
    en: {
        translation: translationEN,
    },
    hn: {
        translation: translationHE,
    },
    de: {
        translation: translationDE,
    },
    es: {
        translation: translationES,
    },
};

i18n.use(initReactI18next)
    .init({
        resources,
        lng: "en", //default language
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;