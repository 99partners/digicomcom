"use client"

import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { TrendingUp, ArrowRight } from "lucide-react"
import { useEffect } from "react"

const CaseStudies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const caseStudies = [
    {
      title: "CraftHaven's 200% Sales Growth",
      description:
        "How a small handcraft business scaled their operations using ONDC integration and strategic partnerships.",
      metrics: ["200% sales increase", "5x customer base growth", "150% profit margin improvement"],
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "EcoWear's Co-Branding Success",
      description:
        "The strategy behind EcoWear's successful co-branding partnership that expanded their market reach.",
      metrics: ["50,000 new customers", "300% brand visibility", "₹10M revenue in 6 months"],
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "PureOrganics' Marketing Transformation",
      description:
        "How digital marketing strategies tripled website traffic and conversion rates for PureOrganics.",
      metrics: ["300% traffic increase", "85% conversion boost", "250% social media growth"],
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "TechTrend's Logistics Optimization",
      description:
        "How TechTrend streamlined their supply chain to achieve faster deliveries and higher customer satisfaction.",
      metrics: ["40% reduction in delivery time", "95% customer satisfaction rate", "20% logistics cost savings"],
      image: "https://images.pexels.com/photos/6169660/pexels-photo-6169660.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ]

  // Schema markup for case studies
  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": caseStudies.map((study, index) => ({
      "@type": "Article",
      "position": index + 1,
      "name": study.title,
      "description": study.description,
      "image": study.image,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href + "#" + study.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }
    }))
  }

  return (
    <>
      <Helmet>
        <title>Digital Commerce Success Stories & Case Studies | 99DigiCom</title>
        <meta name="description" content="Discover how businesses achieved remarkable growth with 99DigiCom's digital commerce solutions. Real success stories with measurable results." />
        <meta name="keywords" content="digital commerce case studies, ecommerce success stories, ONDC case studies, marketplace success" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(caseStudiesSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">Real</span> Results
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Success stories from businesses that transformed with 99digicom.com.
            </p>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="case-studies-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="case-studies-heading" className="text-3xl font-bold text-gray-900 mb-4">Our Success Stories</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how brands have achieved remarkable growth with our platform.
              </p>
            </div>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="feed"
              aria-label="Case studies grid"
            >
              {caseStudies.map((study, index) => (
                <article
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                  aria-labelledby={`case-study-${index}`}
                >
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={`${study.title} success story illustration`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="p-6">
                    <h3 
                      id={`case-study-${index}`}
                      className="text-xl font-semibold text-gray-900 mb-3"
                    >
                      {study.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                    <div 
                      className="space-y-2 mb-4"
                      role="list"
                      aria-label={`Key metrics for ${study.title}`}
                    >
                      {study.metrics.map((metric, metricIndex) => (
                        <div 
                          key={metricIndex} 
                          className="flex items-center"
                          role="listitem"
                        >
                          <TrendingUp className="h-4 w-4 text-green-600 mr-2" aria-hidden="true" />
                          <span className="text-sm font-medium text-gray-900">{metric}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="#"
                      className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                      aria-label={`Read full case study about ${study.title}`}
                    >
                      Read Full Case Study
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default CaseStudies