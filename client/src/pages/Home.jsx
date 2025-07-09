import { Link } from "react-router-dom"
import {  Puzzle,
  Target,
  LineChart,
  Handshake,
  ShieldCheck,
  Rocket,
  Headset,
  Trophy,
Star} from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Puzzle,
      title: "Seamless Integration, Maximum Reach",
      description:
        "We provide unified expertise across Amazon, Flipkart, Meesho, Jiomart, ONDC, Swiggy, and Zomato. One partner, infinite possibilities.",
      benefit: "End-to-End eCommerce Ecosystem Mastery",
    },
    {
      icon: Target,
      title: "Beyond Setup: Platform-First Optimization",
      description:
        "Craft bespoke strategies tailored to each platform’s unique algorithms, audience, and practices.",
      benefit: "Platform-Specific Strategy Architects",
    },
    {
      icon: LineChart,
      title: "ROI-Focused Advertising & Marketing",
      description:
        "Target precisely, optimize relentlessly, and drive measurable sales growth.",
      benefit: "Data-Driven Growth Engine",
    },
    {
      icon: Handshake,
      title: "Amplify Reach Through Smart Alliances",
      description:
        "Create co-branded partnerships that leverage audiences for exponential growth.",
      benefit: "Strategic Partnership Pioneers",
    },
    {
      icon: ShieldCheck,
      title: "Your Brand, Our Obsession",
      description:
        "Manage reputation and ensure consistent, strategic brand visibility across digital platforms.",
      benefit: "Holistic Brand Custodians",
    },
    {
      icon: Rocket,
      title: "Future-Proof Your Digital Presence",
      description:
        "Adapt to trends and algorithm changes to stay competitive and innovative.",
      benefit: "Agile Innovation Partners",
    },
    {
      icon: Headset,
      title: "Your Dedicated Growth Squad",
      description:
        "Work with experts in account management, operations, and marketing who act as your team.",
      benefit: "Dedicated Success Teams",
    },
    {
      icon: Trophy,
      title: "We Deliver What Matters: Growth",
      description:
        "Boost conversion, cut CAC, and grow your revenue—see our real case studies.",
      benefit: "Proven Results, Tangible Impact",
    },
  ]

  const testimonials = [
    {
      quote: "ONDC integration was a breeze, and our sales skyrocketed within weeks!",
      author: "Neha Patel",
      role: "Founder, CraftHaven",
      rating: 5,
    },
    {
      quote: "Co-branding with a major retailer boosted our brand's reach overnight.",
      author: "Vikram Singh",
      role: "CEO, EcoWear",
      rating: 5,
    },
    {
      quote: "Their marketing campaigns tripled our website traffic. Amazing team!",
      author: "Meera Gupta",
      role: "Marketing Lead, PureOrganics",
      rating: 5,
    },
  ]

  return (
    <div className="pt-12 sm:pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
        {/* Decorative elements - positioned to not overlap text on small screens */}
        <div className="absolute top-10 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 sm:opacity-15 lg:opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-96 xl:h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 sm:opacity-15 lg:opacity-20 animate-pulse delay-300 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-gray-900">
            Empowering Businesses 
            <br /> in the <br />
            <span className="bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text animate-gradient">
              Digital Commerce
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
            Setup, manage, advertise, and co-brand across all top marketplaces.
          </p>
          <div className="flex justify-center">
            <Link
              to="/partnerlogin"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              Join Ecosystem
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Discover innovative solutions to grow your business in the digital age.
            </h3>

          <div className="relative overflow-hidden">
            <div className="flex w-max animate-scroll-x space-x-6 sm:space-x-8">
              {[...features, ...features].map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="min-w-[280px] max-w-[320px] bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {feature.description}
                    </p>
                    <p className="text-xs text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {feature.benefit}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
              Ready to Grow?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
              Start your journey with 99digicom.com today. Partner with us or explore our products to transform your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Link
                to="/partners"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
              >
                Become a Partner
              </Link>
              {/* <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
              >
                Explore Products
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Voices of Success
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
              Hear from our partners and customers who've thrived with 99digicom.com.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-green-500 group"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm sm:text-base md:text-lg text-gray-600 italic mb-4 sm:mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {/* <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
              Top Picks from Our Shop
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
              Explore our best-selling products driving digital commerce success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden group border border-green-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl font-bold text-green-600">{product.price}</span>
                    <Link
                      to="/shop"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm sm:text-base"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home