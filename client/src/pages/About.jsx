// import React from 'react';
// import { Baseline as Timeline, Target, Users, Award, Heart, Lightbulb } from 'lucide-react';

// const About = () => {
//   const milestones = [
//     { year: '2020', event: 'Company Founded', description: 'Started with a vision to empower SMBs' },
//     { year: '2022', event: 'ONDC Partnership', description: 'Became official ONDC integration partner' },
//     { year: '2024', event: '10,000+ Partners', description: 'Reached milestone of serving 10,000+ businesses' },
//     { year: '2025', event: 'Global Expansion', description: 'Expanding services to international markets' }
//   ];

//   const values = [
//     { icon: Lightbulb, title: 'Innovation', description: 'Pioneering solutions for the digital age' },
//     { icon: Users, title: 'Collaboration', description: 'Building strong partnerships for mutual growth' },
//     { icon: Award, title: 'Customer Success', description: 'Prioritizing your business success' },
//     { icon: Heart, title: 'Integrity', description: 'Transparent and ethical practices' }
//   ];

//   const team = [
//     {
//       name: 'Arjun Mehra',
//       role: 'CEO & Founder',
//       bio: 'With 15 years in e-commerce, Arjun leads 99digicom.com with a vision for inclusive digital growth.',
//       image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
//     },
//     {
//       name: 'Sneha Rao',
//       role: 'Head of Partnerships',
//       bio: 'Sneha specializes in building strategic alliances, driving our co-branding success.',
//       image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300'
//     },
//     {
//       name: 'Rohan Desai',
//       role: 'CTO',
//       bio: 'Rohan ensures our platform is robust and user-friendly, with a focus on ONDC integration.',
//       image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300'
//     }
//   ];

//   return (
//     <div className="pt-16">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl lg:text-6xl font-bold mb-6">About 99digicom.com</h1>
//           <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
//             Empowering businesses to thrive in the digital commerce ecosystem through innovation, collaboration, and dedicated support.
//           </p>
//         </div>
//       </section>

//       {/* Our Story */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 Founded in 2020, 99digicom.com started with a vision to empower small and medium businesses in India's digital commerce ecosystem. From enabling ONDC integration to fostering co-branding partnerships, we've grown into a trusted platform for thousands of businesses.
//               </p>
//               <p className="text-lg text-gray-600 mb-8">
//                 Our journey is driven by innovation, collaboration, and a passion for helping businesses thrive in the digital age. We believe that every business, regardless of size, deserves access to powerful digital commerce tools.
//               </p>
//               <div className="bg-blue-50 p-6 rounded-lg">
//                 <h3 className="text-xl font-semibold text-blue-900 mb-3">Key Milestones</h3>
//                 <div className="space-y-4">
//                   {milestones.map((milestone, index) => (
//                     <div key={index} className="flex items-start space-x-3">
//                       <div className="flex-shrink-0 w-16 h-8 bg-blue-600 text-white rounded text-sm font-bold flex items-center justify-center">
//                         {milestone.year}
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900">{milestone.event}</h4>
//                         <p className="text-gray-600">{milestone.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="relative">
//               <img 
//                 src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600" 
//                 alt="Digital marketplace" 
//                 className="rounded-lg shadow-2xl"
//               />
//               <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-500 rounded-full opacity-20"></div>
//               <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Purpose</h2>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="bg-white p-8 rounded-xl shadow-lg">
//               <Target className="h-12 w-12 text-blue-600 mb-6" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
//               <p className="text-lg text-gray-600">
//                 To simplify digital commerce for businesses of all sizes through innovative tools, seamless integrations, and strategic partnerships that drive growth and success.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-lg">
//               <Timeline className="h-12 w-12 text-purple-600 mb-6" />
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
//               <p className="text-lg text-gray-600">
//                 To create a connected, inclusive digital marketplace where every business can succeed globally, breaking down barriers and enabling unprecedented growth opportunities.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Core Values */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Values</h2>
//             <p className="text-xl text-gray-600">The principles that guide everything we do</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => {
//               const IconComponent = value.icon;
//               return (
//                 <div key={index} className="text-center group">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//                     <IconComponent className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
//                   <p className="text-gray-600">{value.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Team */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
//             <p className="text-xl text-gray-600">Our team is dedicated to driving your success with expertise and passion.</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {team.map((member, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
//                 <div className="aspect-w-1 aspect-h-1">
//                   <img 
//                     src={member.image} 
//                     alt={member.name}
//                     className="w-full h-64 object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
//                   <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
//                   <p className="text-gray-600">{member.bio}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;




"use client"

import { Handshake, Target, Users, Calendar, Globe, BarChart, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const About = () => {
  const milestones = [
    { year: "2020", event: "Company Founded", description: "Started with a vision to empower SMBs" },
    { year: "2022", event: "ONDC Partnership", description: "Became official ONDC integration partner" },
    { year: "2024", event: "10,000+ Partners", description: "Reached milestone of serving 10,000+ businesses" },
    { year: "2025", event: "Global Expansion", description: "Expanding services to international markets" },
  ]

  const values = [
    {
      icon: Handshake,
      title: "Partnership First",
      description:
        "We believe growth is better when it's shared. Every seller, creator, and collaborator is treated as a long-term partner.",
    },
    {
      icon: Users,
      title: "Enable, Don't Just Offer",
      description:
        "We don't just give access — we enable success with services like onboarding, content creation, co-branding, and ads.",
    },
    {
      icon: BarChart,
      title: "Performance with Purpose",
      description:
        "Our strategies are ROI-focused, but always aligned with ethical, sustainable, and customer-centric goals.",
    },
    {
      icon: Globe,
      title: "Simplifying Digital for All",
      description:
        "We're on a mission to make digital commerce accessible, affordable, and manageable — even for first-time sellers.",
    },
  ]

  const team = [
    {
      name: "Arjun Mehra",
      role: "CEO & Founder",
      bio: "With 15 years in e-commerce, Arjun leads 99digicom.com with a vision for inclusive digital growth.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Sneha Rao",
      role: "Head of Partnerships",
      bio: "Sneha specializes in building strategic alliances, driving our co-branding success.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Rohan Desai",
      role: "CTO",
      bio: "Rohan ensures our platform is robust and user-friendly, with a focus on ONDC integration.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ]

  const goals = [
    "Onboard 10,000+ sellers into digital commerce by 2027",
    "Become the go-to platform for co-branded eCommerce marketing",
    "Build a network of multi-platform success stories from India's heartland",
    "Expand services to include training, fulfilment, and international market access",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-green-600">99digicom.com</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering businesses to thrive in the digital commerce ecosystem through innovation, collaboration, and
            dedicated support.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, 99digicom.com started with a vision to empower small and medium businesses in India's
                digital commerce ecosystem. From enabling ONDC integration to fostering co-branding partnerships, we've
                grown into a trusted platform for thousands of businesses.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our journey is driven by innovation, collaboration, and a passion for helping businesses thrive in the
                digital age. We believe that every business, regardless of size, deserves access to powerful digital
                commerce tools.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Milestones</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-16 h-8 bg-green-600 text-white rounded text-sm font-bold flex items-center justify-center">
                        {milestone.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{milestone.event}</h4>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
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
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
            <p className="text-lg text-gray-600">Our Values and Goals</p>
          </div>
          <div className="space-y-8">
            {/* Mission & Vision Overview */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-8 w-8 text-green-600 mr-2" /> Mission & Vision
              </h3>
              <p className="text-lg text-gray-600">
                Empowering Indian businesses to thrive in the digital commerce era.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-8 w-8 text-green-600 mr-2" /> Our Mission
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                At 99digicom, our mission is to democratize digital commerce by enabling brands of all sizes — from
                local artisans to emerging D2C leaders — to access, grow, and succeed across India's leading e-commerce
                platforms.
              </p>
              <p className="text-lg text-gray-600">
                We aim to remove complexity, reduce barriers, and provide technology-backed, service-driven solutions
                that help our partners scale faster and smarter.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-8 w-8 text-green-600 mr-2" /> Our Vision
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
                <li>Every product brand in India — small or large — has equal access to digital marketplaces.</li>
                <li>Sellers no longer struggle with platform complexity, account setup, or marketing.</li>
                <li>Co-branded growth becomes a norm, where collaboration replaces competition.</li>
                <li>
                  99digicom becomes India's most trusted eCommerce enablement ecosystem, connecting product makers with
                  digital buyers at scale.
                </li>
              </ul>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="h-8 w-8 text-green-600 mr-2" /> Our Core Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <div key={index} className="flex items-start space-x-4 p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Long-Term Goals */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-8 w-8 text-green-600 mr-2" /> Our Long-Term Goals
              </h3>
              <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
                {goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>

            {/* Closing Statement and Buttons */}
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
              <p className="text-lg text-gray-600 mb-6">
                At 99digicom, we're not just building a company — we're enabling a movement that transforms the way
                India sells, scales, and collaborates.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/partner"
                  className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-lg text-gray-600">
              Our team is dedicated to driving your success with expertise and passion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About