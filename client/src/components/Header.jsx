"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
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
        { name: "Advertising & Marketing", href: "/services/eCommerce" },
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
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50 border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 min-w-0">
        {/* Logo */}
        <button onClick={() => handleNavigation("/")} className="flex items-center space-x-2 group">
          <img src={logo || "/placeholder.svg"} alt="Digicom Logo" className="h-12 w-auto object-contain sm:h-14 lg:h-16" />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
            Digicom
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0 relative z-10">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.submenu ? (
                <button
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 ${
                    isActive(item.submenu.find(sub => sub.href === pathname)?.href)
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                  } flex items-center`}
                >
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 ${
                    isActive(item.href)
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                  } flex items-center`}
                >
                  {item.name}
                </button>
              )}
              {item.submenu && activeDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleNavigation(subItem.href)}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        isActive(subItem.href)
                          ? "text-green-700 bg-green-100"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          {/* Shop Button */}
          <button
            onClick={() => handleNavigation("/shop")}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
          >
            Shop
          </button>

          {/* Join Us Button */}
          <button
            onClick={() => handleNavigation("/login")}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
          >
            Join Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-green-700"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pt-4 pb-6 space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-base flex items-center ${
                      isActive(item.submenu.find(sub => sub.href === pathname)?.href)
                        ? "text-green-700 bg-green-100"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavigation(subItem.href)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                            isActive(subItem.href)
                              ? "text-green-700 bg-green-100"
                              : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                          }`}
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-base ${
                    isActive(item.href)
                      ? "text-green-700 bg-green-100"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}

          {/* Shop Button for Mobile */}
          <button
            onClick={() => handleNavigation("/shop")}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm"
          >
            Shop
          </button>

          {/* Join Us Button for Mobile */}
          <div className="mt-4 border-t pt-4">
            <button
              onClick={() => handleNavigation("/login")}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm"
            >
              Join Us
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
export default Header
