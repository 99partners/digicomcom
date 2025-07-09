"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Calendar, ArrowRight } from "lucide-react"
import { simulateApiCall } from '../config/mockData'

const mockBlogs = [
  {
    _id: '1',
    title: 'Getting Started with Digital Commerce',
    excerpt: 'Learn the fundamentals of setting up and growing your digital commerce business.',
    category: 'E-commerce',
    readTime: '5 min read',
    image: '/placeholder.svg',
    createdAt: new Date('2024-01-15'),
  },
  {
    _id: '2',
    title: 'Maximizing Your Online Sales',
    excerpt: 'Discover proven strategies to increase your online sales and customer engagement.',
    category: 'Marketing',
    readTime: '7 min read',
    image: '/placeholder.svg',
    createdAt: new Date('2024-02-01'),
  },
  {
    _id: '3',
    title: 'Building Customer Trust Online',
    excerpt: 'Essential tips for building and maintaining customer trust in the digital space.',
    category: 'Customer Relations',
    readTime: '6 min read',
    image: '/placeholder.svg',
    createdAt: new Date('2024-02-15'),
  }
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await simulateApiCall({ 
          success: true, 
          data: mockBlogs 
        });
        if (response.success) {
          setBlogs(response.data)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            <span className="text-green-600">Insights</span> & Trends
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay ahead with the latest in digital commerce and business growth strategies.
          </p>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600">
              Explore expert insights and tips to grow your business.
            </p>
          </div>
          {loading ? (
            <div className="text-center text-gray-600">Loading blogs...</div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="relative">
                    <img
                      src={blog.image || "/placeholder.svg"}
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

     
    </div>
  )
}

export default Blogs