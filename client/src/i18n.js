import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from './translations/en.json';
import translationHI from './translations/hi.json';
import translationGU from './translations/gu.json';
import translationPA from './translations/pa.json';
import translationMR from './translations/mr.json';
import translationBN from './translations/bn.json';

const resources = {
  en: {
    translation: translationEN
  },
  hi: {
    translation: translationHI
  },
  gu: {
    translation: translationGU
  },
  pa: {
    translation: translationPA
  },
  mr: {
    translation: translationMR
  },
  bn: {
    translation: translationBN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'appLang',
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;