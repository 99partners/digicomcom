"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Search, ChevronDown } from "lucide-react" // Added ChevronDown
import logo from "../assets/99digicom.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false) // State for Services dropdown
  const location = useLocation()
  const pathname = location.pathname

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services", dropdown: [
      { name: "Co-Branding Solutions", href: "/services/co-branding" },
      { name: "Platform Enablement & AMS", href: "/services/platform-ams" }
    ] },
    { name: "Product Partners", href: "/partners" },
    { name: "Resources", href: "/resources" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ]

  const isActive = (href) => pathname === href

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery)
    }
  }

  if (pathname === "/customerlogin" || pathname === "/partnerlogin") return null

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50 border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-3 flex items-center justify-between h-16 min-w-0">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img src={logo || "/placeholder.svg"} alt="Digicom Logo" className="h-16 w-auto object-contain" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
            Digicom
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0 relative z-10">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                <div className="relative">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 flex items-center ${
                      isActive(item.href) || isServicesOpen
                        ? "text-green-700 bg-green-100"
                        : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setIsServicesOpen(false)}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 ${
                            isActive(subItem.href) ? "bg-green-100 text-green-700" : ""
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 ${
                    isActive(item.href)
                      ? "text-green-700 bg-green-100"
                      : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          {/* Search Bar */}
          <div
            className="relative z-20"
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <div
                  className={`flex items-center transition-all duration-300 ease-in-out ${
                    isSearchExpanded ? "w-64" : "w-10"
                  } h-10 bg-white hover:bg-gray-50 rounded-full border border-gray-200 hover:border-green-500 shadow-sm relative z-20`}
                >
                  <Search className="absolute left-3 h-4 w-4 text-gray-400 z-30" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`transition-all duration-300 ease-in-out border-0 bg-transparent focus:ring-0 focus:border-0 focus:outline-none pl-10 pr-4 py-2 rounded-full text-sm ${
                      isSearchExpanded ? "opacity-100 w-full" : "opacity-0 w-0"
                    }`}
                    style={{
                      width: isSearchExpanded ? "100%" : "0",
                      padding: isSearchExpanded ? "0.5rem 1rem 0.5rem 2.5rem" : "0",
                    }}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Shop Button */}
          <Link
            to="/shop"
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          >
            Shop
          </Link>

          {/* Join Us Button */}
          <Link
            to="/partnerlogin"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          >
            <span>Join Us</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600 hover:text-green-700">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pt-4 pb-6 space-y-2">
          <div className="mb-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </form>
          </div>

          {navigation.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-base flex items-center ${
                      isActive(item.href) || isServicesOpen
                        ? "text-green-700 bg-green-100"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isServicesOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => {
                            setIsMenuOpen(false)
                            setIsServicesOpen(false)
                          }}
                          className={`block px-4 py-2 rounded-lg text-sm ${
                            isActive(subItem.href)
                              ? "text-green-700 bg-green-100"
                              : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-base ${
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

          {/* Shop Button for Mobile */}
          <Link
            to="/shop"
            onClick={() => setIsMenuOpen(false)}
            className="block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
          >
            Shop
          </Link>

          <div className="mt-4 border-t pt-4">
            <Link
              to="/partnerlogin"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-center font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200"
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header