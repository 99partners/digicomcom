import { Link } from "react-router-dom"
import { Globe, Handshake, Megaphone, Truck, ArrowRight, Star } from "lucide-react"

const Home = () => {
  const features = [
    {
      icon: Globe,
      title: "Seamless ONDC Integration",
      description:
        "Join the Open Network for Digital Commerce (ONDC) effortlessly with our guided setup and compliance tools. Reach millions of customers across India.",
      benefit: "Expand your market without complexity.",
    },
    {
      icon: Handshake,
      title: "Strategic Brand Partnerships",
      description:
        "Create impactful co-branded campaigns with customizable templates and shared analytics to boost visibility.",
      benefit: "Strengthen your brand through trusted collaborations.",
    },
    {
      icon: Megaphone,
      title: "Drive Traffic & Sales",
      description:
        "Leverage SEO, social media, and targeted ads to attract and retain customers with tailored strategies.",
      benefit: "Maximize ROI with data-driven campaigns.",
    },
    {
      icon: Truck,
      title: "Streamlined Operations",
      description:
        "Simplify shipping and fulfillment with our integrated logistics solutions, ensuring fast and reliable delivery.",
      benefit: "Delight customers with efficient service.",
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

  const featuredProducts = [
    {
      title: "ONDC Starter Kit",
      description: "Tools for seamless ONDC onboarding, including APIs and compliance guides.",
      price: "₹4,999/month",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Co-Branding Suite",
      description: "Custom templates and analytics for impactful brand partnerships.",
      price: "₹7,999/month",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Digital Marketing Pro",
      description: "SEO, social media, and ads tailored to your business goals.",
      price: "₹9,999/month",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Empowering Businesses in the <span className="text-lime-300">Digital Commerce Era</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-emerald-100 max-w-4xl mx-auto">
              Scale your business with seamless ONDC integration, strategic co-branding, and powerful digital marketing
              solutions.
            </p>
            <p className="text-lg mb-12 text-emerald-200 max-w-3xl mx-auto">
              Join a thriving ecosystem of businesses leveraging our tools to succeed in digital commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/partners"
                className="inline-flex items-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold rounded-lg transition-all duration-300"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-300"></div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why 99digicom.com?</h2>
            <p className="text-xl text-gray-600">
              Discover innovative solutions to grow your business in the digital age.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <p className="text-sm font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {feature.benefit}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Grow?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Start your journey with 99digicom.com today. Partner with us or explore our products to transform your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/partners"
                className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold rounded-lg transition-all duration-300"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Voices of Success</h2>
            <p className="text-xl text-gray-600">
              Hear from our partners and customers who've thrived with 99digicom.com.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-emerald-500"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 text-lg italic mb-6">"{testimonial.quote}"</blockquote>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Picks from Our Shop</h2>
            <p className="text-xl text-gray-600">Explore our best-selling products driving digital commerce success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-emerald-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                    <Link
                      to="/shop"
                      className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
