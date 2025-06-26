import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const pathname = location.pathname;

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Product Partners", href: "/partners" },
    { name: "Shop", href: "/shop" },
    { name: "Resources", href: "/resources" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href) => pathname === href;

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide header on login page
  if (pathname === "/login") return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <Globe className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-900 group-hover:text-green-700">
            99digicom
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "text-green-700 bg-green-100"
                  : "text-gray-600 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Join Us Dropdown */}
        <div className="hidden lg:flex relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            <span>Join Us</span>
            <ChevronDown
              className={`h-4 w-4 transform transition ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded-xl z-50">
              <Link
                to="/login"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-green-50 text-sm text-gray-700"
              >
                Partner Login
              </Link>
             
              <div className="border-t my-2" />
              <Link
                to="/login"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-green-50 text-sm text-gray-700"
              >
                Customer Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-green-700"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 pt-4 pb-6 space-y-2">
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

          {/* Join Us - Mobile */}
          <div className="mt-4 border-t pt-4">
            <div className="text-sm font-semibold text-gray-600 uppercase mb-2">
              Join Us
            </div>
            <div>
              <div className="text-xs text-green-600 uppercase mb-1">Partner</div>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 bg-green-50 rounded-lg text-sm text-gray-700 hover:bg-green-100"
              >
                Partner Login
              </Link>
          
            </div>
            <div className="mt-3">
              <div className="text-xs text-green-600 uppercase mb-1">Customer</div>
              <Link
                to="/login"
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
  );
};

export default Header;
