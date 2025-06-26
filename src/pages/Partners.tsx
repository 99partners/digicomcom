import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Globe, Headphones, CheckCircle, ArrowRight, DollarSign, Calendar, Star } from 'lucide-react';

const Partners = () => {
  const benefits = [
    {
      icon: Globe,
      title: 'Access to ONDC\'s vast customer base',
      description: 'Reach millions of customers across India through the Open Network for Digital Commerce.'
    },
    {
      icon: TrendingUp,
      title: 'Enhanced brand exposure through co-branding',
      description: 'Partner with established brands to boost your visibility and credibility.'
    },
    {
      icon: Users,
      title: 'Simplified logistics and fulfillment',
      description: 'Streamline operations with our integrated supply chain solutions.'
    },
    {
      icon: Headphones,
      title: 'Dedicated support and analytics',
      description: '24/7 support team and comprehensive analytics to track your success.'
    }
  ];

  const onboardingSteps = [
    {
      step: '01',
      title: 'Submit Application',
      description: 'Fill out our comprehensive partner inquiry form with your business details.'
    },
    {
      step: '02',
      title: 'Review & Approval',
      description: 'Our team evaluates your business fit and partnership potential.'
    },
    {
      step: '03',
      title: 'Setup & Training',
      description: 'Get access to our platform tools and comprehensive training resources.'
    },
    {
      step: '04',
      title: 'Go Live',
      description: 'Start selling on our platform and reaching new customers.'
    }
  ];

  const successStories = [
    {
      company: 'CraftHaven',
      result: '200% sales increase',
      description: 'After ONDC integration, CraftHaven saw explosive growth in their handmade products segment.',
      metric: '₹2.5M+ revenue in first quarter'
    },
    {
      company: 'EcoWear',
      result: '50,000 new customers',
      description: 'Co-branding partnership helped EcoWear expand their sustainable fashion reach significantly.',
      metric: '300% brand visibility boost'
    },
    {
      company: 'PureOrganics',
      result: '150% traffic boost',
      description: 'Our digital marketing services tripled their website traffic and conversion rates.',
      metric: '85% increase in conversion rate'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Partner with 99digicom.com</h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
            Join thousands of successful businesses leveraging our platform to scale their digital commerce operations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Become a Partner Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Why Partner with Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join 99digicom.com?</h2>
            <p className="text-xl text-gray-600">Partnering with us opens doors to growth, visibility, and success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Onboarding Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Become a Partner</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to get you started</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Commitments */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees. Clear, straightforward pricing structure.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                  <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">One-Time Setup</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">₹10,000</p>
                  <p className="text-gray-600">Onboarding and platform setup</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                  <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly Access</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹2,999</p>
                  <p className="text-gray-600">Platform access and support</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                  <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Add-Ons</h3>
                  <p className="text-lg font-semibold text-purple-600 mb-2">From ₹3,000</p>
                  <p className="text-gray-600">Digital marketing & logistics</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-semibold text-gray-900">No Hidden Fees</span>
                </div>
                <p className="text-gray-600 mb-2">
                  What you see is what you pay. Cancel anytime with no penalties.
                </p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• Digital marketing add-on: ₹5,000/month</p>
                  <p>• Advanced logistics support: ₹3,000/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Partner Success Stories</h2>
            <p className="text-xl text-gray-600">Real results from real businesses that partnered with us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{story.company}</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {story.result}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{story.description}</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-900 font-semibold">{story.metric}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/resources"
              className="inline-flex items-center px-6 py-3 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Read Full Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Partner Network?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards scaling your business with 99digicom.com. Our team is ready to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold rounded-lg transition-all duration-300"
            >
              Learn About Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;