import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import logo from "./assets/99digicom.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const dropdownRef = useRef(null)

  const location = useLocation()
  const pathname = location.pathname

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Product Partners", href: "/partners" },
    { name: "Shop", href: "/shop" },
    { name: "Resources", href: "/resources" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    { name: "Co-Branding", href: "/co-branding" },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActive = (href) => pathname === href

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery)
    }
  }

  if (pathname === "/login") return null

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 flex items-center justify-between h-16 min-w-0">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
        <img

            src={logo}
            alt="Digicom Logo"
            className="h-16 w-auto object-contain"
            />
          
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
            Digicom
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 flex-shrink-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                isActive(item.href)
                  ? "text-green-700 bg-green-100"
                  : "text-gray-600 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
          {/* Search Bar */}
          <div
            className="relative"
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <div
                  className={`flex items-center transition-all duration-300 ease-in-out ${
                    isSearchExpanded ? "w-64" : "w-10"
                  } h-10 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 hover:border-green-500`}
                >
                  <Search className="absolute left-3 h-4 w-4 text-gray-400 z-10" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`transition-all duration-300 ease-in-out border-0 bg-transparent focus:ring-0 focus:border-0 pl-10 pr-4 py-2 rounded-full ${
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

          {/* Join Us Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              <span>Join Us</span>
              <ChevronDown
                className={`h-4 w-4 transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl border border-gray-200 rounded-xl z-50 overflow-hidden">
                <Link
                  to="/login?type=partner"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 hover:bg-green-50 text-sm text-gray-700 hover:text-green-700 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium">Partner Login</div>
                  <div className="text-xs text-gray-500 mt-1">Access partner dashboard</div>
                </Link>
                <Link
                  to="/login?type=customer"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 hover:bg-green-50 text-sm text-gray-700 hover:text-green-700 transition-colors"
                >
                  <div className="font-medium">Customer Login</div>
                  <div className="text-xs text-gray-500 mt-1">Access your account</div>
                </Link>
              </div>
            )}
          </div>
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
          ))}

          <div className="mt-4 border-t pt-4">
            <div className="text-sm font-semibold text-gray-600 uppercase mb-2">Join Us</div>
            <div>
              <div className="text-xs text-green-600 uppercase mb-1">Partner</div>
              <Link
                to="/login?type=partner"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 bg-green-50 rounded-lg text-sm text-gray-700 hover:bg-green-100 mb-2"
              >
                Partner Login
              </Link>
            </div>
            <div>
              <div className="text-xs text-green-600 uppercase mb-1">Customer</div>
              <Link
                to="/login?type=customer"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 bg-green-50 rounded-lg text-sm text-gray-700 hover:bg-green-100"
              >
                Customer Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
