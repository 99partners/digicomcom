"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, ArrowLeft } from "lucide-react"
import axios from "axios"
import { getApiUrl, getImageUrl } from '../config/api.config'
import SEO from '../components/SEO';

const BlogDetails = () => {
  const { title } = useParams()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        // Fetch all blogs
        const allBlogsResponse = await axios.get(getApiUrl('api/blogs'))
        if (allBlogsResponse.data.success) {
          // Find the blog with matching title slug
          const decodedTitle = decodeURIComponent(title.toLowerCase())
          const foundBlog = allBlogsResponse.data.data.find(b => {
            // Try multiple matching approaches to improve reliability
            const blogTitleSlug = b.title.replace(/\s+/g, '-').toLowerCase()
            const blogTitleSlugNoSpecial = b.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()
            
            return blogTitleSlug === decodedTitle || 
                   blogTitleSlugNoSpecial === decodedTitle ||
                   b._id === decodedTitle // Fallback to ID matching
          })
          
          if (foundBlog) {
            setBlog(foundBlog)
            
            // Get related blogs (excluding current blog)
            const filtered = allBlogsResponse.data.data
              .filter(b => b._id !== foundBlog._id)
              .slice(0, 3) // Get only 3 related blogs
            setRelatedBlogs(filtered)
          } else {
            setError('Blog not found')
          }
        }
      } catch (error) {
        setError('Failed to fetch blog details')
        console.error('Error fetching blog details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogAndRelated()
    window.scrollTo(0, 0)
  }, [title])

  const getCategoryColor = (category) => {
    const colors = {
      "Platform Enablement": "bg-blue-100 text-blue-800",
      "Account Management": "bg-green-100 text-green-800",
      "Marketing": "bg-purple-100 text-purple-800",
      "Co-Branding": "bg-orange-100 text-orange-800",
      "E-Commerce": "bg-pink-100 text-pink-800"
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <Link
            to="/resources/blogs"
            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {blog && (
        <SEO
          title={blog.title}
          description={blog.excerpt}
          keywords={`${blog.category}, digital commerce, business growth, ${blog.title.toLowerCase()}`}
          ogImage={blog.image}
          ogType="article"
          canonicalUrl={`https://99digicom.com/resources/blogs/${blog.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}`}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-32 pb-8 px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/resources/blogs"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-medium mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blogs
            </Link>

            {/* Featured Image */}
            <img
              src={getImageUrl(blog.image) || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-[400px] object-cover rounded-xl shadow-lg mb-8"
              loading="lazy"
            />

            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(blog.category)}`}>
                {blog.category}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-green-600 mr-1" />
                <time dateTime={blog.createdAt}>{new Date(blog.createdAt).toLocaleDateString()}</time>
                <span className="mx-2">•</span>
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>

            {/* Content */}
            <article 
              className="prose prose-lg max-w-none prose-green prose-p:my-4 prose-p:text-gray-700 prose-headings:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
              itemScope
              itemType="http://schema.org/BlogPosting"
            >
              <meta itemProp="headline" content={blog.title} />
              <meta itemProp="author" content="99Digicom" />
              <meta itemProp="datePublished" content={blog.createdAt} />
              <meta itemProp="image" content={blog.image} />
              <div 
                itemProp="articleBody"
                className="blog-content"
                dangerouslySetInnerHTML={{ 
                  __html: blog.content.split('\n').map(paragraph => {
                    // Handle paragraphs with image tags
                    if (paragraph.includes('<img') && paragraph.includes('BCO.')) {
                      return paragraph.replace(/src="(BCO\.[a-f0-9-]+\.png)"/g, 'src="/assets/$1"');
                    }
                    // Handle direct image references
                    else if (paragraph.includes('BCO.')) {
                      return `<p><img src="/assets/${paragraph.trim()}" alt="Blog image" class="w-full rounded-lg my-4" /></p>`;
                    }
                    // Regular paragraph
                    return paragraph.trim() ? `<p>${paragraph}</p>` : '';
                  }).join('')
                }} 
              />
            </article>
          </div>
        </section>

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <article
                    key={relatedBlog._id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                  >
                    <div className="relative">
                      <img
                        src={getImageUrl(relatedBlog.image) || "/placeholder.svg"}
                        alt={relatedBlog.title}
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedBlog.category)}`}>
                          {relatedBlog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="h-4 w-4 text-green-600 mr-1" />
                        <time dateTime={relatedBlog.createdAt}>
                          {new Date(relatedBlog.createdAt).toLocaleDateString()}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{relatedBlog.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {relatedBlog.excerpt}
                      </p>
                      <Link
                        to={`/resources/blogs/${relatedBlog.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}`}
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                      >
                        Read More
                        <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogDetails;