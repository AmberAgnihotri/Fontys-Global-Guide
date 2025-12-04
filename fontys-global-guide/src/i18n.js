import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import nl from "./locales/nl.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import zh from "./locales/zh.json";
import tr from "./locales/tr.json";


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            nl: { translation: nl },
            de: { translation: de },
            fr: { translation: fr },
            es: { translation: es },
            zh: { translation: zh },
            tr: { translation: tr }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
