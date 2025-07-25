"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Star, ShoppingCart, Filter, Search } from "lucide-react"
import { useEffect } from "react";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const featuredProducts = [
    {
      id: 1,
      title: "ONDC Starter Kit",
      description: "Tools for seamless ONDC onboarding, including APIs and compliance guides.",
      price: "₹4,999/month",
      originalPrice: "₹6,999/month",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 127,
      category: "digital",
      badge: "Most Popular",
    },
    {
      id: 2,
      title: "Co-Branding Suite",
      description: "Custom templates and analytics for impactful brand partnerships.",
      price: "₹7,999/month",
      originalPrice: "₹9,999/month",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 89,
      category: "digital",
      badge: "Featured",
    },
    {
      id: 3,
      title: "Digital Marketing Pro",
      description: "SEO, social media, and ads tailored to your business goals.",
      price: "₹9,999/month",
      originalPrice: "₹12,999/month",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 203,
      category: "digital",
      badge: "Best Value",
    },
  ]

  const categories = [
    { id: "all", name: "All Products", count: 24 },
    { id: "organic", name: "Organic", count: 8 },
    { id: "spiritual", name: "Spiritual", count: 6 },
    { id: "handmade", name: "Handmade", count: 10 },
  ]

  const newArrivals = [
    {
      id: 4,
      title: "Organic Cotton Tote",
      price: "₹999",
      image: "https://images.pexels.com/photos/1131777/pexels-photo-1131777.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      category: "organic",
    },
    {
      id: 5,
      title: "Handmade Incense Set",
      price: "₹499",
      image: "https://images.pexels.com/photos/6794825/pexels-photo-6794825.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      category: "spiritual",
    },
    {
      id: 6,
      title: "Spiritual Wall Art",
      price: "₹1,999",
      image: "https://images.pexels.com/photos/3008128/pexels-photo-3008128.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      category: "spiritual",
    },
  ]

  const bestSellers = [
    {
      id: 1,
      title: "ONDC Starter Kit",
      price: "₹4,999/month",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      category: "digital",
    },
    {
      id: 7,
      title: "Organic Skincare Bundle",
      price: "₹2,499",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      category: "organic",
    },
    {
      id: 8,
      title: "Handmade Jewelry Set",
      price: "₹1,499",
      image: "https://images.pexels.com/photos/1472443/pexels-photo-1472443.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      category: "handmade",
    },
  ]

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? "text-green-600 fill-current" : "text-gray-300"}`} />
    ))
  }

  const ProductCard = ({ product, showBadge = false }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6 flex flex-col h-full">
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-40 sm:h-48 object-cover rounded-lg"
        />
        {showBadge && product.badge && (
          <div className="absolute top-3 left-3 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
            {product.badge}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between p-2 sm:p-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
          {product.description && <p className="text-gray-600 text-xs sm:text-sm mb-3">{product.description}</p>}
          <div className="flex items-center mb-3">
            <div className="flex items-center">{renderStars(product.rating)}</div>
            {product.reviews && <span className="ml-2 text-xs sm:text-sm text-gray-600">({product.reviews})</span>}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-base sm:text-xl font-bold text-green-600">{product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-xs sm:text-sm text-gray-600 line-through">{product.originalPrice}</span>
            )}
          </div>
          <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-xs sm:text-sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop Our Products</h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover tools and products that power your digital commerce success
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                      selectedCategory === category.id
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 hover:bg-green-100 border border-green-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 md:mt-0">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64 transition-all text-xs sm:text-sm"
                />
              </div>
              <Link
                to="/customerlogin"
                className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors w-full sm:w-auto text-center"
              >
                Customer Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Featured Products</h2>
            <p className="text-sm sm:text-lg text-gray-600">Our most popular digital commerce solutions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showBadge={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Shop by Category</h2>
            <p className="text-sm sm:text-lg text-gray-600">Find products that match your business needs</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Organic",
                description: "Eco-friendly products for sustainable businesses",
                image:
                  "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400",
                count: "8 products",
              },
              {
                name: "Spiritual",
                description: "Artisanal spiritual items and wellness products",
                image:
                  "https://images.pexels.com/photos/3008128/pexels-photo-3008128.jpeg?auto=compress&cs=tinysrgb&w=400",
                count: "6 products",
              },
              {
                name: "Handmade",
                description: "Unique, handcrafted goods from local artisans",
                image:
                  "https://images.pexels.com/photos/1472443/pexels-photo-1472443.jpeg?auto=compress&cs=tinysrgb&w=400",
                count: "10 products",
              },
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-40 sm:h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="p-4 sm:p-6 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{category.description}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2">
                    {category.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">New Arrivals</h2>
            <p className="text-sm sm:text-lg text-gray-600">Latest additions to our product collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Best Sellers</h2>
            <p className="text-sm sm:text-lg text-gray-600">Top-rated products chosen by our customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Need Help Choosing?</h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Our team is here to help you find the perfect products for your business needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-xs sm:text-base"
          >
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Shop