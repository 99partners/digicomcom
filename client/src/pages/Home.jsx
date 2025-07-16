import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Puzzle,
  Target,
  LineChart,
  Handshake,
  ShieldCheck,
  Rocket,
  Headset,
  Trophy,
  Star,
  Calendar,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from '../config/api.config';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const response = await axios.get(getApiUrl('api/blogs'));
      if (response.data.success) {
        setBlogs(response.data.data.slice(0, 3)); // Get only the latest 3 blogs
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

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
  ];

  const coreServices = [
    {
      icon: Puzzle,
      title: "Seller Account Setup",
      frontText: "Amazon, Flipkart, Meesho",
      backText:
        "We offer end-to-end onboarding, document handling, and account activation across major Indian marketplaces to get you selling fast.",
    },
    {
      icon: ShieldCheck,
      title: "Account Management",
      frontText: "Listings, Orders, SEO",
      backText:
        "We handle cataloging, listing updates, return resolution, performance monitoring, and keyword-rich SEO optimization.",
    },
    {
      icon: Target,
      title: "Advertising & Marketing",
      frontText: "Sponsored Ads, Creatives",
      backText:
        "Our campaigns use keyword targeting, A/B testing, and attractive creatives to improve visibility, clicks, and conversions.",
    },
    {
      icon: Handshake,
      title: "Co‑Branding Solutions",
      frontText: "Influencer Collaborations",
      backText:
        "We connect you with influencers and allied brands for bundled offerings, joint campaigns, and visibility spikes across platforms.",
    },
  ];

  return (
    <div className="pt-12 sm:pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-gray-900">
            Fuel your{" "}
            <span className="bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text animate-gradient">
              E‑Commerce
            </span>
            <br /> Growth with <br />
            <span className="bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text animate-gradient">
              Proven Expertise
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
            Setup, Manage, Advertise, and Co-Brand across all Top marketplaces.
          </p>
          <div className="flex justify-center">
            <Link
              to="/partnerlogin"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services with Stylish Flippable Cards */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="relative group h-80 perspective">
                  <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* Front Side */}
                    <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                      <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-4 bg-gradient-to-br from-white via-gray-50 to-green-50 hover:from-green-50 hover:to-white transition-all duration-300">
                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center shadow transition hover:bg-green-200 transform hover:scale-110">
                          <Icon className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900">{service.title}</h4>
                        <p className="text-sm text-gray-600 text-center">{service.frontText}</p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute w-full h-full backface-hidden bg-white text-gray-800 rounded-xl shadow-xl rotate-y-180 flex items-center justify-center p-6 border">
                      <p className="text-sm sm:text-base text-center leading-relaxed">
                        {service.backText}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why 99digicom?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                We simplify your selling journey with a hassle-free setup process, dedicated support,
                and years of marketplace expertise. With a proven 90%+ customer retention rate, we
                ensure sellers not only launch but grow with us. Trust 99digicom to deliver excellence
                at every stage.
              </p>
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start"><span className="text-green-600 font-semibold mr-2">✓</span>Dedicated Account Manager</li>
                <li className="flex items-start"><span className="text-green-600 font-semibold mr-2">✓</span>Platform-Specific Expertise</li>
                <li className="flex items-start"><span className="text-green-600 font-semibold mr-2">✓</span>Proven Success Rates (90%+ customer retention)</li>
                <li className="flex items-start"><span className="text-green-600 font-semibold mr-2">✓</span>7-Day Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* Latest Blogs Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Insights</h2>
            <p className="text-lg text-gray-600">
              Stay ahead with the latest in digital commerce and business growth strategies.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">Loading blogs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 text-green-600 mr-1" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                    <Link
                      to={`/resources/blogs/${blog._id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/resources/blogs"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
