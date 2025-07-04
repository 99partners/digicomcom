"use client"

import { Link } from "react-router-dom"
import { Download, TrendingUp, ArrowRight, FileText, Video, Calendar } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from '../config/api.config';

const Resources = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch blogs from the server
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(getApiUrl('api/blogs'));
        if (response.data.success) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  const guides = [
    {
      title: "How to List Your Products on 99digicom.com",
      description: "Complete step-by-step guide to getting your products listed and optimized on our platform.",
      icon: FileText,
      type: "PDF Guide",
      pages: "24 pages",
    },
    {
      title: "Setting Up Your ONDC Storefront",
      description: "Comprehensive tutorial on setting up and optimizing your ONDC-enabled online store.",
      icon: Video,
      type: "Video Tutorial",
      duration: "45 min",
    },
    {
      title: "Optimizing Logistics for Fast Delivery",
      description: "Best practices for streamlining your logistics and ensuring customer satisfaction.",
      icon: Download,
      type: "Checklist",
      items: "15 items",
    },
  ]

  const faqs = [
    {
      question: "How do I join ONDC through 99digicom.com?",
      answer:
        "Follow our simple 4-step onboarding process: Submit application, review & approval, setup & training, then go live. Our team will guide you through each step.",
    },
    {
      question: "What are the costs of partnering with 99digicom.com?",
      answer:
        "We have transparent pricing: ₹10,000 one-time setup fee and ₹2,999 monthly subscription. Optional add-ons include digital marketing (₹5,000/month) and logistics support (₹3,000/month).",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time with no penalties or hidden fees. We believe in flexible partnerships that work for your business.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer 24/7 technical support, dedicated account managers, comprehensive training resources, and regular performance analytics to ensure your success.",
    },
    {
      question: "How long does ONDC integration take?",
      answer:
        "Typically, ONDC integration takes 7-14 business days after approval. This includes setup, testing, and going live on the network.",
    },
    {
      question: "Do you provide marketing support?",
      answer:
        "Yes, we offer comprehensive digital marketing services including SEO, social media marketing, and targeted advertising campaigns as optional add-ons.",
    },
  ]

  const caseStudies = [
    {
      title: "CraftHaven's 200% Sales Growth",
      description:
        "How a small handcraft business scaled their operations using ONDC integration and strategic partnerships.",
      metrics: ["200% sales increase", "5x customer base growth", "150% profit margin improvement"],
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "EcoWear's Co-Branding Success",
      description: "The strategy behind EcoWear's successful co-branding partnership that expanded their market reach.",
      metrics: ["50,000 new customers", "300% brand visibility", "₹10M revenue in 6 months"],
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "PureOrganics' Marketing Transformation",
      description: "How digital marketing strategies tripled website traffic and conversion rates for PureOrganics.",
      metrics: ["300% traffic increase", "85% conversion boost", "250% social media growth"],
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Resource</span> Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed in digital commerce - guides, insights, and expert knowledge at your
            fingertips.
          </p>
        </div>
      </section>

      {/* Blogs & Articles */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Insights & Trends</h2>
            <p className="text-lg text-gray-600">
              Stay ahead with the latest in digital commerce and business growth strategies.
            </p>
          </div>
          {loading ? (
            <div className="text-center">Loading blogs...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-lg"
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
                      to={`/blog/${blog._id}`}
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
        </div>
      </section>

      {/* Guides & Tutorials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Learn with Us</h2>
            <p className="text-lg text-gray-600">
              Comprehensive guides and tutorials to help you master digital commerce.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, index) => {
              const IconComponent = guide.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center mr-4 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        {guide.type}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{guide.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{guide.pages || guide.duration || guide.items}</span>
                    <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Results</h2>
            <p className="text-lg text-gray-600">
              Success stories from businesses that transformed with 99digicom.com.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                <img src={study.image || "/placeholder.svg"} alt={study.title} className="w-full h-48 object-cover rounded-lg" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{study.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                  <div className="space-y-2 mb-4">
                    {study.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{metric}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="#"
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                  >
                    Read Full Case Study
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Still Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Our team of experts is here to help you navigate your digital commerce journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/partners"
              className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-medium rounded-lg transition-colors"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Resources