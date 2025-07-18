"use client"

import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import logo from "../assets/99digicom.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Services",
      submenu: [
        { name: "Platform Enablement", href: "/services/platformEnable" },
        { name: "AMS", href: "/services/ams" },
        { name: "Advertising & Marketing", href: "/services/advertising_marketing" },
        { name: "Co-Branding", href: "/services/coBranding" },
      ],
    },
    {
      name: "Partners",
      submenu: [
        { name: "Our Partners", href: "/partners/ourPartners" },
        { name: "Why Partners", href: "/partners/whyPartners" },
        { name: "Partners Onboarding", href: "/partners/partnersOnboarding" },
      ],
    },
    {
      name: "Resources",
      submenu: [
        { name: "Blogs", href: "/resources/blogs" },
        { name: "Guides & Tutorials", href: "/resources/guidesTutorials" },
        { name: "FAQs", href: "/resources/faqss" },
        { name: "Case Studies", href: "/resources/caseStudies" },
        { name: "Careers", href: "/resources/careers" },
      ],
    },
    { name: "Contact Us", href: "/contact" },
  ]

  const isActive = (href) => pathname === href || (href && pathname.startsWith(href + "/"))

  const handleNavigation = (href) => {
    navigate(href)
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  if (pathname === "/customerlogin" || pathname === "/partnerlogin") return null

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50 border-b border-gray-100" role="banner">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 min-w-0">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="99Digicom - Home"
          >
            <img 
              src={logo || "/placeholder.svg"} 
              alt="99Digicom Logo" 
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
              width="64"
              height="64"
            />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
              Digicom
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav 
          className="hidden lg:flex items-center space-x-1 flex-shrink-0 relative z-10"
          role="navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.submenu ? (
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 ${
                      isActive(item.submenu.find(sub => sub.href === pathname)?.href) || activeDropdown === item.name
                        ? "text-green-700 bg-green-100"
                        : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                    } flex items-center`}
                    aria-expanded={activeDropdown === item.name}
                    aria-controls={`dropdown-${item.name}`}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div 
                    id={`dropdown-${item.name}`}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 transition-all duration-200 ${
                      activeDropdown === item.name 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={`dropdown-button-${item.name}`}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        onClick={() => {
                          setActiveDropdown(null)
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive(subItem.href)
                            ? "text-green-700 bg-green-100"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }`}
                        role="menuitem"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 ${
                    isActive(item.href)
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                  } flex items-center`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          <Link
            to="/shop"
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
            aria-label="Visit our shop"
          >
            Shop
          </Link>

          <Link
            to="/partnerlogin"
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
            aria-label="Partner login or signup"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-green-700"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`lg:hidden bg-white shadow-md px-4 pt-4 pb-6 space-y-2 ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <div key={item.name}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-base flex items-center justify-between ${
                    isActive(item.submenu.find(sub => sub.href === pathname)?.href)
                      ? "text-green-700 bg-green-100"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                  aria-expanded={activeDropdown === item.name}
                  aria-controls={`mobile-dropdown-${item.name}`}
                >
                  {item.name}
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`mobile-dropdown-${item.name}`}
                  className={`ml-4 mt-2 space-y-1 transition-all duration-200 ${
                    activeDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      onClick={() => {
                        setActiveDropdown(null)
                        setIsMenuOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-2 rounded-lg text-sm ${
                        isActive(subItem.href)
                          ? "text-green-700 bg-green-100"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
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
                className={`block w-full text-left px-4 py-2 rounded-lg text-base ${
                  isActive(item.href)
                    ? "text-green-700 bg-green-100"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}

        {/* Mobile Action Buttons */}
        <div className="mt-4 space-y-2">
          <Link
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm"
            aria-label="Visit our shop"
          >
            Shop
          </Link>

          <Link
            to="/partnerlogin"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm"
            aria-label="Partner login or signup"
          >
            Join Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
