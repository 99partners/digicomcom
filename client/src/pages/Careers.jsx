"use client"

import { Link } from "react-router-dom"
import { MapPin, Clock, DollarSign, Users, Heart, Lightbulb, Award, Coffee, ArrowRight } from "lucide-react"
import { useEffect } from "react";

const Careers = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const openPositions = [
    {
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹8L–12L/year",
      description: "Lead digital marketing strategies and campaigns to drive growth and brand awareness.",
      requirements: [
        "3+ years experience in digital marketing",
        "Expertise in SEO, SEM, and social media",
        "Experience with analytics tools",
        "Strong communication skills",
      ],
    },
    {
      title: "Logistics Coordinator",
      department: "Operations",
      location: "Bengaluru, India",
      type: "Full-time",
      salary: "₹6L–9L/year",
      description: "Manage logistics operations and ensure efficient supply chain processes.",
      requirements: [
        "2+ years in logistics/supply chain",
        "Knowledge of warehouse management",
        "Experience with logistics software",
        "Problem-solving abilities",
      ],
    },
    {
      title: "Software Developer",
      department: "Engineering",
      location: "Hybrid",
      type: "Full-time",
      salary: "₹10L–15L/year",
      description: "Develop and maintain our platform with focus on scalability and user experience.",
      requirements: [
        "Strong programming skills (React, Node.js)",
        "3+ years development experience",
        "Experience with cloud platforms",
        "API development knowledge",
      ],
    },
  ]

  const internships = [
    {
      title: "Marketing Intern",
      duration: "3 months",
      stipend: "₹15,000/month",
      location: "Mumbai",
      description: "Support digital marketing campaigns and content creation initiatives.",
    },
    {
      title: "Tech Intern",
      duration: "3 months",
      stipend: "₹20,000/month",
      location: "Bengaluru",
      description: "Work on exciting tech projects and learn from our experienced development team.",
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work-life balance with flexible working arrangements",
    },
    {
      icon: Lightbulb,
      title: "Learning & Growth",
      description: "Continuous learning opportunities and skill development",
    },
    {
      icon: Coffee,
      title: "Great Workplace",
      description: "Modern office spaces with all amenities",
    },
    {
      icon: Users,
      title: "Team Events",
      description: "Regular team building activities and celebrations",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Performance-based rewards and recognition programs",
    },
  ]

  const values = [
    "Innovation: We embrace new ideas and creative solutions",
    "Collaboration: We work together to achieve common goals",
    "Integrity: We maintain transparency and ethical practices",
    "Customer Focus: We prioritize customer success above all",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Build the future of digital commerce with a team that values innovation, collaboration, and growth.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="#positions"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="#internships"
              className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-medium rounded-lg transition-colors"
            >
              Explore Internships
            </Link>
          </div> */}
        </div>
      </section>

      
      {/* Benefits
      // <section className="py-16 px-4 bg-white">
      //   <div className="max-w-7xl mx-auto">
      //     <div className="text-center mb-12">
      //       <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
      //       <p className="text-lg text-gray-600">
      //         We believe in taking care of our team with competitive benefits and a supportive environment.
      //       </p>
      //     </div>
      //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      //       {benefits.map((benefit, index) => {
      //         const IconComponent = benefit.icon
      //         return (
      //           <div
      //             key={index}
      //             className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
      //           >
      //             <div className="w-12 h-12 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center mb-4 transition-colors">
      //               <IconComponent className="h-6 w-6 text-green-600" />
      //             </div>
      //             <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
      //             <p className="text-gray-600 text-sm">{benefit.description}</p>
      //           </div>
      //         )
      //       })}
      //     </div>
      //   </div>
      // </section> */}

      {/* Open Positions */}
      <section id="positions" className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600">
              Join our growing team and help shape the future of digital commerce.
            </p>
          </div>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {position.department}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-green-600 mr-1" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-green-600 mr-1" />
                        <span>{position.type}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                        <span>{position.salary}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{position.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="lg:col-span-1 flex flex-col justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section id="internships" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Internship Opportunities</h2>
            <p className="text-lg text-gray-600">
              Start your career journey with hands-on experience and mentorship from industry experts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{internship.title}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {internship.duration}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-green-600 mr-1" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                    <span>{internship.stipend}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-6">{internship.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Apply for Internship
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Culture & Values */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Culture</h2>
              <p className="text-lg text-gray-600 mb-6">
                At 99digicom.com, we foster innovation, collaboration, and growth. We believe in creating a dynamic,
                inclusive workplace where every team member can thrive and make a meaningful impact.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Expect a culture that values creativity, encourages learning, and celebrates both individual
                achievements and team success. We're building something extraordinary together.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Our Values:</h3>
                <ul className="space-y-2">
                  {values.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>






      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join Our Mission?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Be part of a team that's revolutionizing digital commerce and empowering businesses across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-medium rounded-lg transition-colors"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Careers