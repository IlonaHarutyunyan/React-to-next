import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import locales from '../public/locales';

const url = new URL(window.location.href);
const localeFromUrl = url.searchParams.get('lang');
const locale = locales[localeFromUrl] ? localeFromUrl : null;

if (locale) {
  localStorage.setItem('bfLang', locale);
}

export const currentLang = locale || localStorage.getItem('bfLang') || process.env.LOCALE || 'en';

i18n.use(initReactI18next).init({
  resources: locales,
  lng: currentLang,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
