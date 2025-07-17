"use client"

import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { MapPin, Clock, DollarSign, Users, Heart, Lightbulb, Award, Coffee, ArrowRight } from "lucide-react"
import { useEffect } from "react";

const Careers = () => {
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

  // Schema markup for job postings
  const jobPostingsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "99DigiCom",
    "jobPosting": [
      ...openPositions.map(position => ({
        "@type": "JobPosting",
        "title": position.title,
        "description": position.description,
        "employmentType": position.type,
        "datePosted": new Date().toISOString(),
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": position.location,
            "addressCountry": "IN"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": position.salary.replace(/[^0-9]/g, ''),
            "unitText": "YEAR"
          }
        },
        "qualifications": position.requirements.join(", "),
        "industry": "Digital Commerce",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "99DigiCom"
        }
      }))
    ]
  };

  return (
    <>
      <Helmet>
        <title>Careers at 99DigiCom | Join Our Digital Commerce Team</title>
        <meta name="description" content="Join 99DigiCom's innovative team. Explore exciting career opportunities in digital commerce, technology, marketing, and operations. Shape the future of e-commerce." />
        <meta name="keywords" content="digital commerce jobs, ecommerce careers, tech jobs india, marketing jobs" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(jobPostingsSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 bg-white" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              Join <span className="text-green-600">Our Team</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Build the future of digital commerce with a team that values innovation, collaboration, and growth.
            </p>
          </div>
        </section>

        {/* Open Positions */}
        <section 
          id="positions" 
          className="py-16 px-4 bg-green-50"
          aria-labelledby="positions-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="positions-heading" className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
              <p className="text-lg text-gray-600">
                Join our growing team and help shape the future of digital commerce.
              </p>
            </div>
            <div className="space-y-6" role="list">
              {openPositions.map((position, index) => (
                <article
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                  role="listitem"
                  aria-labelledby={`position-${index}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 id={`position-${index}`} className="text-2xl font-bold text-gray-900">{position.title}</h3>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {position.department}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
                          <span>{position.salary}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{position.description}</p>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="space-y-1" role="list">
                          {position.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start" role="listitem">
                              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></div>
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
                        aria-label={`Apply for ${position.title} position`}
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Internships */}
        <section 
          id="internships" 
          className="py-16 px-4 bg-white"
          aria-labelledby="internships-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="internships-heading" className="text-3xl font-bold text-gray-900 mb-4">Internship Opportunities</h2>
              <p className="text-lg text-gray-600">
                Start your career journey with hands-on experience and mentorship from industry experts.
              </p>
            </div>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              role="list"
            >
              {internships.map((internship, index) => (
                <article
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                  role="listitem"
                  aria-labelledby={`internship-${index}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 id={`internship-${index}`} className="text-xl font-bold text-gray-900">{internship.title}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {internship.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
                      <span>{internship.stipend}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">{internship.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                    aria-label={`Apply for ${internship.title} internship`}
                  >
                    Apply for Internship
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Culture & Values */}
        <section 
          className="py-16 px-4 bg-green-50"
          aria-labelledby="culture-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="culture-heading" className="text-3xl font-bold text-gray-900 mb-6">Our Culture</h2>
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
                  <ul className="space-y-2" role="list">
                    {values.map((value, index) => (
                      <li key={index} className="flex items-start" role="listitem">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></div>
                        <span className="text-gray-600 text-sm">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Team members collaborating in a modern office environment"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Careers