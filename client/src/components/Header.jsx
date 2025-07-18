"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import logo from "../assets/99digicom.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeMarketplace, setActiveMarketplace] = useState(null)
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()
  const megaMenuRef = useRef(null)

  const marketplaces = {
    amazon: {
      name: "Amazon",
      href: "/partners/marketplaces/amazon",
      services: [
        {
          title: "Account Management",
          description: "Showcase your business with a stunning, professional online presence"
        },
        {
          title: "Brand Store",
          description: "Running a business can be incredibly demanding, leaving little time for consistent brand promotion."
        },
        {
          title: "Listing and Cataloging",
          description: "100% of successful brands use business phone numbers to significantly enhance their growth potential."
        },
        {
          title: "A+ Listing",
          description: "We offer the expertise of a dedicated account manager for your business."
        },
        {
          title: "Advertising",
          description: "Boost Your Business with Effective Review Management"
        },
        {
          title: "Glowroad Account Management Services",
          description: "Comprehensive account management services for Glowroad sellers"
        }
      ]
    },
    flipkart: {
      name: "Flipkart",
      href: "/partners/marketplaces/flipkart",
      services: [
        {
          title: "Account Management",
          description: "Showcase your business with a stunning, professional online presence"
        },
        {
          title: "Shopsy Account Management Services",
          description: "Complete management services for Shopsy sellers"
        },
        {
          title: "Listing and Cataloging",
          description: "100% of successful brands use business phone numbers to significantly enhance their growth potential."
        },
        {
          title: "Advertising",
          description: "Boost Your Business with Effective Review Management"
        }
      ]
    },
    ondc: {
      name: "ONDC",
      href: "/partners/marketplaces/ondc",
      services: [
        {
          title: "Account Management",
          description: "Showcase your business with a stunning, professional online presence"
        },
        {
          title: "Listing and Cataloging",
          description: "100% of successful brands use business phone numbers to significantly enhance their growth potential."
        },
        {
          title: "Advertising",
          description: "Boost Your Business with Effective Review Management"
        }
      ]
    },
    jiomart: {
      name: "JioMart",
      href: "/partners/marketplaces/jiomart",
      services: [
        {
          title: "Account Management",
          description: "Showcase your business with a stunning, professional online presence"
        },
        {
          title: "Listing and Cataloging",
          description: "100% of successful brands use business phone numbers to significantly enhance their growth potential."
        },
        {
          title: "Advertising",
          description: "Boost Your Business with Effective Review Management"
        }
      ]
    },
    meesho: {
      name: "Meesho",
      href: "/partners/marketplaces/meesho",
      services: [
        {
          title: "Account Management",
          description: "Showcase your business with a stunning, professional online presence"
        },
        {
          title: "Listing and Cataloging",
          description: "100% of successful brands use business phone numbers to significantly enhance their growth potential."
        },
        {
          title: "Advertising",
          description: "Boost Your Business with Effective Review Management"
        }
      ]
    },
    indiamart: {
      name: "IndiaMART",
      href: "/partners/marketplaces/indiamart",
      services: [
        {
          title: "Account Management",
          description: "Comprehensive B2B account management and optimization services"
        },
        {
          title: "Lead Management",
          description: "Advanced lead tracking, qualification, and response management system"
        },
        {
          title: "Catalog Optimization",
          description: "Professional product catalog creation and optimization for B2B visibility"
        },
        {
          title: "Buy Lead Subscription",
          description: "Strategic management of buy leads and subscription optimization"
        },
        {
          title: "Premium Listing",
          description: "Enhanced visibility with premium listing and category-specific optimization"
        },
        {
          title: "Business Analytics",
          description: "Detailed analytics and insights for better business decision making"
        }
      ]
    },
    snapdeal: {
      name: "Snapdeal",
      href: "/partners/marketplaces/snapdeal",
      services: [
        {
          title: "Account Management",
          description: "Complete Snapdeal seller account setup and management"
        },
        {
          title: "Catalog Management",
          description: "Professional product listing and catalog optimization"
        },
        {
          title: "Order Processing",
          description: "Streamlined order management and fulfillment services"
        },
        {
          title: "Performance Marketing",
          description: "Targeted advertising and promotion strategies"
        },
        {
          title: "Analytics & Reporting",
          description: "Comprehensive performance tracking and business insights"
        },
        {
          title: "Competitor Analysis",
          description: "Detailed market research and competitive positioning"
        }
      ]
    }
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Services",
      submenu: [
        { name: "Platform Enablement", href: "/services/platformEnable" },
        { name: "Account Management Service", href: "/services/ams" },
        { name: "Advertising & Marketing", href: "/services/advertising_marketing" },
        { name: "Co-Branding", href: "/services/coBranding" },
      ],
    },
    {
      name: "Partners",
      submenu: [
        { 
          name: "Our Partners",
          href: "/partners/ourPartners",
          hasMarketplaces: true
        },
        { name: "Why Partners With Us?", href: "/partners/whyPartners" },
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

  const handleMarketplaceHover = (marketplace) => {
    setActiveMarketplace(marketplace)
  }

  const handleMenuItemClick = (href) => {
    navigate(href)
    setIsMenuOpen(false)
    setActiveDropdown(null)
    setActiveMarketplace(null)
  }

  const handleHeaderMouseLeave = (e) => {
    if (megaMenuRef.current && !megaMenuRef.current.contains(e.relatedTarget)) {
      setActiveMarketplace(null)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 ${
                      isActive(item.submenu.find(sub => sub.href === pathname)?.href) || activeDropdown === item.name
                        ? "text-green-700 bg-green-100"
                        : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                    } flex items-center min-w-[160px] justify-between`}
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
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap relative z-10 ${
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

      {/* Mega Menu */}
      {activeDropdown && (
        <div
          ref={megaMenuRef}
          className="fixed top-16 left-0 right-0 bg-white shadow-xl border-b border-gray-100 z-50 transition-all duration-300"
          onMouseLeave={handleHeaderMouseLeave}
        >
          <div className="max-w-8xl mx-auto px-6 py-8">
            {activeDropdown === "Partners" ? (
              <div>
                {/* Top Row - Main Menu Items */}
                <div className="flex gap-6 mb-8">
                  {navigation.find(item => item.name === activeDropdown)?.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      onClick={() => handleMenuItemClick(subItem.href)}
                      className={`block px-6 py-4 rounded-lg transition-all duration-200 ${
                        isActive(subItem.href)
                          ? "text-green-700 bg-green-100"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                    >
                      <h3 className="text-lg font-semibold">{subItem.name}</h3>
                    </Link>
                  ))}
                </div>

                {/* Marketplace Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column - Marketplace List */}
                  <div className="md:col-span-1">
                    <div className="space-y-1 pl-4">
                      {Object.entries(marketplaces).map(([key, marketplace]) => (
                        <div
                          key={key}
                          onMouseEnter={() => handleMarketplaceHover(key)}
                          onClick={() => handleMenuItemClick(marketplace.href)}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            activeMarketplace === key
                              ? "bg-green-100 text-green-700 shadow-sm"
                              : "hover:bg-green-50 hover:text-green-600"
                          }`}
                        >
                          <span className="font-medium">{marketplace.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Marketplace Details */}
                  <div className={`md:col-span-2 transition-all duration-300 ${
                    activeMarketplace ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    {activeMarketplace && (
                      <div className="bg-gray-50 rounded-lg p-8">
                        {/* Marketplace Logo */}
                        <div className="mb-8 flex justify-center">
                          <img 
                            src={`/marketplace-logos/${activeMarketplace}.png`} 
                            alt={`${marketplaces[activeMarketplace].name} logo`}
                            className="h-16 object-contain"
                          />
                        </div>
                        
                        {/* Services Grid */}
                        <div className="grid grid-cols-3 gap-8">
                          {marketplaces[activeMarketplace].services.map((service, index) => (
                            <Link
                              key={index}
                              to={marketplaces[activeMarketplace].href}
                              onClick={() => handleMenuItemClick(marketplaces[activeMarketplace].href)}
                              className="block p-6 rounded-lg bg-white hover:shadow-lg transition-all duration-300 group text-center h-full border border-gray-100 hover:border-green-100"
                            >
                              <h4 className="font-semibold text-gray-900 group-hover:text-green-700 mb-3 text-lg">
                                {service.title}
                              </h4>
                              <p className="text-sm text-gray-600 group-hover:text-green-600">
                                {service.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {navigation.find(item => item.name === activeDropdown)?.submenu.map((subItem) => (
                  <div key={subItem.name} className="group">
                    <Link
                      to={subItem.href}
                      onClick={() => {
                        setActiveDropdown(null)
                        handleNavigation(subItem.href)
                      }}
                      className={`block w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        isActive(subItem.href)
                          ? "text-green-700 bg-green-100"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2">{subItem.name}</h3>
                      <p className="text-sm text-gray-600 group-hover:text-green-700 transition-colors">
                        Explore our {subItem.name.toLowerCase()}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
                    activeDropdown === item.name ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <div key={subItem.name}>
                      <Link
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
                      {subItem.hasMarketplaces && (
                        <div className="ml-4 mt-2 space-y-1">
                          {Object.entries(marketplaces).map(([key, marketplace]) => (
                            <Link
                              key={key}
                              to={marketplace.href}
                              onClick={() => {
                                setActiveDropdown(null)
                                setIsMenuOpen(false)
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-green-700"
                            >
                              {marketplace.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
  )
}

export default Header