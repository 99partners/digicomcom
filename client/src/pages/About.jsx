"use client";

import { useEffect } from "react";
import {
  Handshake,
  Target,
  Users,
  Calendar,
  Globe,
  BarChart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from '../components/SEO';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    { year: "2020", event: "Company Founded", description: "Started with a vision to empower SMBs" },
    { year: "2022", event: "ONDC Partnership", description: "Became official ONDC integration partner" },
    { year: "2024", event: "10,000+ Partners", description: "Reached milestone of serving 10,000+ businesses" },
    { year: "2025", event: "Global Expansion", description: "Expanding services to international markets" },
  ];

  const values = [
    { icon: Handshake, title: "Partnership First", description: "We believe growth is better when it's shared. Every seller, creator, and collaborator is treated as a long-term partner." },
    { icon: Users, title: "Enable, Don't Just Offer", description: "We don't just give access — we enable success with services like onboarding, content creation, co-branding, and ads." },
    { icon: BarChart, title: "Performance with Purpose", description: "Our strategies are ROI-focused, but always aligned with ethical, sustainable, and customer-centric goals." },
    { icon: Globe, title: "Simplifying Digital for All", description: "We're on a mission to make digital commerce accessible, affordable, and manageable — even for first-time sellers." },
  ];

  const goals = [
    "Onboard 10,000+ sellers into digital commerce by 2027",
    "Become the go-to platform for co-branded eCommerce marketing",
    "Build a network of multi-platform success stories from India's heartland",
    "Expand services to include training, fulfilment, and international market access",
  ];

  return (
    <>
      <SEO
        title="About 99Digicom - Digital Commerce Solutions Provider"
        description="Learn about 99Digicom's journey in empowering businesses through digital commerce solutions. Discover our values, mission, and commitment to your success."
        keywords="digital commerce, e-commerce solutions, ONDC partner, business enablement, digital transformation, Indian marketplace"
        canonicalUrl="https://99digicom.com/about"
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <article>
          <header className="pt-24 pb-16 px-4 sm:px-6 md:px-10 bg-white">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-green-600">99digicom.com</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Empowering businesses to thrive in the digital commerce ecosystem through innovation, collaboration, and dedicated support.
              </p>
            </div>
          </header>

          <section className="py-16 px-4 sm:px-6 md:px-10 bg-white" aria-labelledby="mission-vision-heading">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center">
                <h2 id="mission-vision-heading" className="text-3xl font-bold text-gray-900 mb-4">Mission & Vision</h2>
                <p className="text-base sm:text-lg text-gray-600">Our Values and Goals</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Mission & Vision", "Our Mission", "Our Vision"].map((title, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="h-6 w-6 text-green-600 mr-2" aria-hidden="true" /> {title}
                    </h3>
                    <p className="text-base text-gray-600">
                      {title === "Mission & Vision"
                        ? "Empowering Indian businesses to thrive in the digital commerce era."
                        : title === "Our Mission"
                        ? "Our mission is to democratize digital commerce by enabling brands of all sizes — from local artisans to emerging D2C leaders — to access, grow, and succeed across India's leading e-commerce platforms."
                        : "Every product brand in India has equal access to marketplaces, sellers are supported, and 99digicom becomes India's most trusted enabler."}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-green-600 mr-2" aria-hidden="true" /> Our Core Values
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((val, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <val.icon className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{val.title}</h4>
                        <p className="text-sm text-gray-600">{val.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-6 w-6 text-green-600 mr-2" aria-hidden="true" /> Our Long-Term Goals
                </h3>
                <ul className="list-disc list-inside text-base text-gray-600 space-y-2" role="list">
                  {goals.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 md:px-10 bg-green-50" aria-labelledby="journey-heading">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="journey-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                  Founded in 2020, 99digicom.com started with a vision to empower small and medium businesses in India's digital commerce ecosystem.
                </p>
                <p className="text-base sm:text-lg text-gray-600 mb-8">
                  Our journey is driven by innovation, collaboration, and a passion for helping businesses thrive in the digital age.
                </p>
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Milestones</h3>
                  {milestones.map((m, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-16 h-8 bg-green-600 text-white rounded text-sm font-bold flex items-center justify-center">
                        {m.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{m.event}</h4>
                        <p className="text-gray-600 text-sm">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="99Digicom team collaborating on digital marketplace solutions"
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                  width="600"
                  height="400"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default About;
