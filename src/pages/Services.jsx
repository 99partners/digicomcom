import { Link } from "react-router-dom"
import { Globe, Handshake, Truck, ArrowRight, CheckCircle } from "lucide-react"

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "ONDC Platforms Enablement & AMS",
      description:
        "Seamlessly integrate with ONDC and manage your storefront with our Application Management Services (AMS). Includes API access, compliance tools, and performance analytics.",
      features: [
        "Complete ONDC API integration",
        "Compliance monitoring and reporting",
        "Real-time performance analytics",
        "Dedicated technical support",
        "Custom dashboard and controls",
      ],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
      cta: "Get Started",
    },
    {
      icon: Handshake,
      title: "Co-Branding Solutions",
      description:
        "Create powerful brand collaborations with customizable storefronts, shared campaigns, and analytics to track joint success.",
      features: [
        "Custom co-branded storefronts",
        "Shared marketing campaigns",
        "Joint analytics and reporting",
        "Brand partnership matching",
        "Campaign performance tracking",
      ],
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
      cta: "Explore Now",
    },
    {
      icon: Truck,
      title: "Logistics & Fulfillment",
      description:
        "Streamline your supply chain with our end-to-end logistics solutions, including warehousing, shipping, and real-time tracking.",
      features: [
        "Multi-location warehousing",
        "Same-day and next-day delivery",
        "Real-time shipment tracking",
        "Automated inventory management",
        "Returns and exchange handling",
      ],
      image: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=600",
      cta: "Learn More",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
            Comprehensive solutions to power your digital commerce journey and accelerate business growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const IconComponent = service.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div className="relative group">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="rounded-xl shadow-2xl w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent rounded-xl"></div>
                      <div className="absolute bottom-6 left-6">
                        <div className="w-12 h-12 bg-emerald-500/30 backdrop-blur-sm rounded-lg flex items-center justify-center border border-emerald-400/50">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`bg-white p-8 rounded-xl shadow-lg border-l-4 border-emerald-500 hover:shadow-2xl transition-all duration-300 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-emerald-600" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{service.title}</h2>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {service.cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with personalized support to deliver exceptional results for your
              business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "24/7 Support", desc: "Round-the-clock technical assistance" },
              { title: "Scalable Solutions", desc: "Grow with flexible, adaptable platforms" },
              { title: "Expert Team", desc: "Industry veterans with proven track records" },
              { title: "Proven Results", desc: "95% client satisfaction rate" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-green-50 rounded-xl hover:bg-emerald-50 transition-colors group border border-emerald-100"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-green-700 to-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your digital commerce goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/partners"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold rounded-lg transition-all duration-300"
            >
              Become a Partner
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-300"></div>
      </section>
    </div>
  )
}

export default Services
