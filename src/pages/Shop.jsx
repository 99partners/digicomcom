import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Filter, Search } from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = [
    {
      id: 1,
      title: 'ONDC Starter Kit',
      description: 'Tools for seamless ONDC onboarding, including APIs and compliance guides.',
      price: '₹4,999/month',
      originalPrice: '₹6,999/month',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 127,
      category: 'digital',
      badge: 'Most Popular'
    },
    {
      id: 2,
      title: 'Co-Branding Suite',
      description: 'Custom templates and analytics for impactful brand partnerships.',
      price: '₹7,999/month',
      originalPrice: '₹9,999/month',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 89,
      category: 'digital',
      badge: 'Featured'
    },
    {
      id: 3,
      title: 'Digital Marketing Pro',
      description: 'SEO, social media, and ads tailored to your business goals.',
      price: '₹9,999/month',
      originalPrice: '₹12,999/month',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviews: 203,
      category: 'digital',
      badge: 'Best Value'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: 24 },
    { id: 'organic', name: 'Organic', count: 8 },
    { id: 'spiritual', name: 'Spiritual', count: 6 },
    { id: 'handmade', name: 'Handmade', count: 10 }
  ];

  const newArrivals = [
    {
      id: 4,
      title: 'Organic Cotton Tote',
      price: '₹999',
      image: 'https://images.pexels.com/photos/1131777/pexels-photo-1131777.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      category: 'organic'
    },
    {
      id: 5,
      title: 'Handmade Incense Set',
      price: '₹499',
      image: 'https://images.pexels.com/photos/6794825/pexels-photo-6794825.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      category: 'spiritual'
    },
    {
      id: 6,
      title: 'Spiritual Wall Art',
      price: '₹1,999',
      image: 'https://images.pexels.com/photos/3008128/pexels-photo-3008128.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      category: 'spiritual'
    }
  ];

  const bestSellers = [
    {
      id: 1,
      title: 'ONDC Starter Kit',
      price: '₹4,999/month',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      category: 'digital'
    },
    {
      id: 7,
      title: 'Organic Skincare Bundle',
      price: '₹2,499',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      category: 'organic'
    },
    {
      id: 8,
      title: 'Handmade Jewelry Set',
      price: '₹1,499',
      image: 'https://images.pexels.com/photos/1472443/pexels-photo-1472443.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      category: 'handmade'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const ProductCard = ({ product, showBadge = false }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {showBadge && product.badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {product.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        )}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          {product.reviews && (
            <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-blue-600">{product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Shop Our Products</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover tools and products that power your digital commerce success
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Our most popular digital commerce solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} showBadge={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find products that match your business needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Organic',
                description: 'Eco-friendly products for sustainable businesses',
                image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400',
                count: '8 products'
              },
              {
                name: 'Spiritual',
                description: 'Artisanal spiritual items and wellness products',
                image: 'https://images.pexels.com/photos/3008128/pexels-photo-3008128.jpeg?auto=compress&cs=tinysrgb&w=400',
                count: '6 products'
              },
              {
                name: 'Handmade',
                description: 'Unique, handcrafted goods from local artisans',
                image: 'https://images.pexels.com/photos/1472443/pexels-photo-1472443.jpeg?auto=compress&cs=tinysrgb&w=400',
                count: '10 products'
              }
            ].map((category, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm mb-3">{category.description}</p>
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {category.count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-lg text-gray-600">Latest additions to our product collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Sellers</h2>
            <p className="text-lg text-gray-600">Top-rated products chosen by our customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect products for your business needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors shadow-lg"
          >
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Shop;