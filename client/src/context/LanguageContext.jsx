import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('appLang') || 'en';
  });

  useEffect(() => {
    // Initialize i18next with the current language
    const storedLang = localStorage.getItem('appLang');
    if (storedLang) {
      i18n.changeLanguage(storedLang);
      setCurrentLanguage(storedLang);
    } else {
      i18n.changeLanguage(currentLanguage);
    }
  }, []);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('appLang', langCode);
    i18n.changeLanguage(langCode).then(() => {
      // Reload the page to ensure all components are re-rendered with new translations
      window.location.reload();
    }).catch((err) => {
      console.error('Error changing language:', err);
    });
  };

  const value = {
    currentLanguage,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};