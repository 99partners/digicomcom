"use client"

import { Helmet } from "react-helmet"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Calendar, ArrowRight } from "lucide-react"
import axios from "axios"
import { getApiUrl } from '../config/api.config'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(getApiUrl('api/blogs'))
        if (response.data.success) {
          setBlogs(response.data.data)
        }
      } catch (error) {
        setError('Failed to fetch blogs')
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
    window.scrollTo(0, 0)
  }, [])

  // Schema markup for blog listing
  const blogListingSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "99DigiCom Insights & Trends",
    "description": "Stay ahead with the latest in digital commerce and business growth strategies.",
    "url": window.location.href,
    "blogPosts": blogs.map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.excerpt,
      "datePublished": blog.createdAt,
      "image": blog.image,
      "author": {
        "@type": "Organization",
        "name": "99DigiCom"
      }
    }))
  }

  return (
    <>
      <Helmet>
        <title>Digital Commerce Insights & Trends | 99DigiCom Blog</title>
        <meta name="description" content="Explore expert insights, trends, and strategies for digital commerce success. Stay updated with the latest business growth tactics and industry developments." />
        <meta name="keywords" content="digital commerce, business growth, ecommerce trends, digital marketing insights" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(blogListingSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">Insights</span> & Trends
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay ahead with the latest in digital commerce and business growth strategies.
            </p>
          </div>
        </section>

        {/* Blogs Section */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="blogs-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="blogs-heading" className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <p className="text-lg text-gray-600">
                Explore expert insights and tips to grow your business.
              </p>
            </div>

            {loading ? (
              <div 
                className="text-center p-8 bg-white rounded-lg shadow"
                role="status"
                aria-live="polite"
              >
                <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading articles...</p>
              </div>
            ) : error ? (
              <div 
                className="text-center p-8 bg-white rounded-lg shadow"
                role="alert"
                aria-live="assertive"
              >
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  aria-label="Retry loading articles"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                role="feed"
                aria-label="Blog articles"
              >
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                    aria-labelledby={`article-${blog._id}`}
                  >
                    <div className="relative">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={`Featured image for article: ${blog.title}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div 
                        className="flex items-center text-sm text-gray-600 mb-3"
                        aria-label={`Published on ${new Date(blog.createdAt).toLocaleDateString()}, ${blog.readTime} read time`}
                      >
                        <Calendar className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span className="mx-2" aria-hidden="true">•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 
                        id={`article-${blog._id}`}
                        className="text-xl font-semibold text-gray-900 mb-3"
                      >
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                      <Link
                        to={`/resources/blogs/${blog._id}`}
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                        aria-label={`Read more about ${blog.title}`}
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default Blogs