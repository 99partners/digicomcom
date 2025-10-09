import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();
  const closeTimeoutRef = useRef(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(true);
  }, [clearCloseTimeout]);

  const scheduleCloseMenu = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 180);
  }, [clearCloseTimeout]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'gu', name: 'ગુજરાતી' },
    // { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    // { code: 'mr', name: 'मराठी' },
    // { code: 'bn', name: 'বাংলা' }
  ];

  const handleLanguageChange = (langCode) => {
    // Close dropdown first
    setIsOpen(false);
    // Then change language (which will trigger reload in LanguageContext)
    changeLanguage(langCode);
  };

  const selectedLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleCloseMenu}
      onFocus={openMenu}
      onBlur={scheduleCloseMenu}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
          isOpen ? 'text-green-700 bg-green-100' : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="language-menu-panel"
        id="language-menu-button"
      >
        <span>{selectedLang?.name || 'English'}</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="language-menu-panel"
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleCloseMenu}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm ${currentLanguage === language.code ? 'bg-green-50 text-green-600 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              role="menuitem"
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;