"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import logo from "../assets/99digicom.png";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { currentLanguage } = useLanguage();
  const { t, i18n } = useTranslation();
  
  // Force re-render when language changes
  const [, forceUpdate] = useState();
  useEffect(() => {
    const handleLanguageChanged = () => forceUpdate({});
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const navigation = [
    { name: t('common.home'), href: "/" },
    { name: t('common.about'), href: "/about_us" },
    // {
    //   name: t('common.services'),
    //   submenu: [
    //     { name: t('Launch'), href: "/services/launch" },
    //     { name: t('Manage'), href: "/services/manage" },
    //     { name: t('Grow'), href: "/services/grow" },
    //   ],
    // },
    {
      name: t('common.solutions'),
      submenu: [
        { name: t('Join ONDC Seller Acoount'), href: "/solutions/ondc-seller" },
        { name: t('Join ONDC Buyer Acoount'), href: "/solutions/ondc-buyer" },
        { name: t('Cobranding'), href: "/services/co_branding_solutions" }
      ],
    },
    {
      name: t('common.partners'),
      submenu: [
        { name: t('Why Partners With Us?'), href: "/partners/why_Partners_with_us" },
        { name: t('Partners Onboarding'), href: "/partners/partners_Onboarding" },
      ],
    },
    {
      name: t('common.resources'),
      submenu: [
        { name: t('Blogs'), href: "/resources/blogs" },
        // { name: t('Guides & Tutorials'), href: "/resources/guides_Tutorials" },
        { name: t('FAQs'), href: "/resources/faq" },
      ],
    },
    { name: t('common.contact'), href: "/contact_us" },
  ];

  const isActive = (href) => pathname === href || (href && pathname.startsWith(href + "/"));

  if (pathname === "/customerlogin" || pathname === "/partnerlogin") return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50 border-b border-gray-100" role="banner">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-green-700 focus:ring-2 focus:ring-green-600 focus:px-3 focus:py-2 rounded"
      >
        {t('common.skipToMain', 'Skip to main content')}
      </a>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2 group" aria-label="99Digicom - Home">
            <img
              src={logo}
              alt="99Digicom Logo"
              className="h-10 w-auto object-contain sm:h-12 lg:h-14"
              width="56"
              height="56"
              decoding="async"
              fetchpriority="high"
            />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
              {currentLanguage === 'en' && 'Digicom'}
              {currentLanguage === 'hi' && 'डिजिकॉम'}
              {currentLanguage === 'gu' && 'ડિજિકોમ'}
              {/* {currentLanguage === 'pa' && 'ਡਿਜੀਕੋਮ'}
              {currentLanguage === 'mr' && 'डिजिकॉम'}
              {currentLanguage === 'bn' && 'ডিজিকম'} */}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Primary">
          {navigation.map((item, index) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={item.submenu ? () => setActiveDropdown(item.name) : undefined}
              onMouseLeave={item.submenu ? () => setActiveDropdown(null) : undefined}
            >
              {item.submenu ? (
                <div className="relative">
                  <button
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      isActive(item.submenu.find((sub) => sub.href === pathname)?.href)
                        ? "text-green-700 bg-green-100"
                        : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                    } flex items-center`}
                    aria-haspopup="menu"
                    aria-expanded={activeDropdown === item.name}
                    aria-controls={`desktop-submenu-${index}`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {/* Dropdown */}
                  <div
                    id={`desktop-submenu-${index}`}
                    className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-all duration-200 py-2 z-50 ${
                      activeDropdown === item.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                    } group-hover:opacity-100 group-hover:visible`}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`block px-4 py-2 text-sm ${
                          isActive(subItem.href)
                            ? "text-green-700 bg-green-50"
                            : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                        }`}
                        aria-current={isActive(subItem.href) ? "page" : undefined}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "text-green-700 bg-green-100"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <LanguageSelector />
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* <Link
            to="https://shop.99digicom.com"
            className="px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
          > */}
            {/* <Link
            to="https://shop.99digicom.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
          >

            {t('common.shop')}
          </Link> */}
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="p-1 rounded-full hover:bg-green-50 transition-all duration-200"
              title={t('dashboard.profile')}
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </button>
          ) : (
            <Link
              to="/partnerlogin"
              className="px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
            >
              {t('common.joinUs')}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-green-700"
          aria-label={isMenuOpen ? t('common.closeMenu') : t('common.openMenu')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div id="mobile-menu" className={`lg:hidden bg-white shadow-md overflow-y-auto max-h-[calc(100vh-4rem)] ${isMenuOpen ? "block" : "hidden"}`} role="navigation" aria-label="Mobile">
        <div className="p-4 space-y-1">
          {navigation.map((item, index) => (
            <div key={item.name}>
              {item.submenu ? (
                <div className="mb-1">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className={`w-full text-left px-4 py-2.5 text-base flex items-center justify-between ${
                      isActive(item.submenu.find((sub) => sub.href === pathname)?.href)
                        ? "text-green-700 bg-green-100"
                        : "text-gray-700"
                    }`}
                    aria-expanded={activeDropdown === item.name}
                    aria-controls={`mobile-submenu-${index}`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`mobile-submenu-${index}`}
                    className={`overflow-hidden transition-all duration-200 ${
                      activeDropdown === item.name ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={activeDropdown === item.name ? "false" : "true"}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsMenuOpen(false);
                        }}
                        className={`block pl-8 pr-4 py-2.5 text-base ${
                          isActive(subItem.href) ? "text-green-700 font-medium" : "text-gray-700"
                        }`}
                        aria-current={isActive(subItem.href) ? "page" : undefined}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2.5 text-base ${
                    isActive(item.href) ? "text-green-700 font-medium" : "text-gray-700"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <LanguageSelector />
        </div>

        {/* Mobile Action Buttons */}
        <div className="p-4 space-y-2 border-t border-gray-100">
          <Link
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
          >
            {t('common.shop')}
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate('/dashboard/profile');
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2.5 text-base text-left text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">{user?.name || user?.username}</div>
                <div className="text-xs text-gray-600">{t('dashboard.viewProfile')}</div>
              </div>
            </button>
          ) : (
            <Link
              to="/partnerlogin"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              {t('common.joinUs')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
