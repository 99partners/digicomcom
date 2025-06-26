import React from 'react';
import { Baseline as Timeline, Target, Users, Award, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'Started with a vision to empower SMBs' },
    { year: '2022', event: 'ONDC Partnership', description: 'Became official ONDC integration partner' },
    { year: '2024', event: '10,000+ Partners', description: 'Reached milestone of serving 10,000+ businesses' },
    { year: '2025', event: 'Global Expansion', description: 'Expanding services to international markets' }
  ];

  const values = [
    { icon: Lightbulb, title: 'Innovation', description: 'Pioneering solutions for the digital age' },
    { icon: Users, title: 'Collaboration', description: 'Building strong partnerships for mutual growth' },
    { icon: Award, title: 'Customer Success', description: 'Prioritizing your business success' },
    { icon: Heart, title: 'Integrity', description: 'Transparent and ethical practices' }
  ];

  const team = [
    {
      name: 'Arjun Mehra',
      role: 'CEO & Founder',
      bio: 'With 15 years in e-commerce, Arjun leads 99digicom.com with a vision for inclusive digital growth.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Sneha Rao',
      role: 'Head of Partnerships',
      bio: 'Sneha specializes in building strategic alliances, driving our co-branding success.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Rohan Desai',
      role: 'CTO',
      bio: 'Rohan ensures our platform is robust and user-friendly, with a focus on ONDC integration.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">About 99digicom.com</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
            Empowering businesses to thrive in the digital commerce ecosystem through innovation, collaboration, and dedicated support.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, 99digicom.com started with a vision to empower small and medium businesses in India's digital commerce ecosystem. From enabling ONDC integration to fostering co-branding partnerships, we've grown into a trusted platform for thousands of businesses.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our journey is driven by innovation, collaboration, and a passion for helping businesses thrive in the digital age. We believe that every business, regardless of size, deserves access to powerful digital commerce tools.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Key Milestones</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-16 h-8 bg-blue-600 text-white rounded text-sm font-bold flex items-center justify-center">
                        {milestone.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{milestone.event}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Digital marketplace" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Purpose</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Target className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-lg text-gray-600">
                To simplify digital commerce for businesses of all sizes through innovative tools, seamless integrations, and strategic partnerships that drive growth and success.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Timeline className="h-12 w-12 text-purple-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-lg text-gray-600">
                To create a connected, inclusive digital marketplace where every business can succeed globally, breaking down barriers and enabling unprecedented growth opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600">Our team is dedicated to driving your success with expertise and passion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;