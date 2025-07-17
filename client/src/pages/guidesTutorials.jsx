"use client"

import { Helmet } from "react-helmet"
import { useState } from "react"
import { FileText, Download, Video, List, Instagram } from "lucide-react"

const GuidesTutorials = () => {
  const [activePlatform, setActivePlatform] = useState("All")
  const [activeAccordion, setActiveAccordion] = useState("Getting Started")

  const platforms = ["All", "ONDC", "Amazon", "Flipkart", "Meesho", "Jiomart", "Zomato", "Swiggy", "Own Website"]

  const guides = [
    {
      section: "Getting Started",
      expandedByDefault: true,
      content: [
        {
          title: "How to Create a Seller Account",
          items: [
            { name: "ONDC Registration Flow", type: "PDF + Video", icon: FileText, platforms: ["ONDC"] },
            { name: "Amazon Seller Central Setup", type: "Guide", icon: FileText, platforms: ["Amazon"] },
            { name: "Flipkart Seller Hub Guide", type: "Guide", icon: FileText, platforms: ["Flipkart"] },
            { name: "Meesho Seller Onboarding", type: "Guide", icon: FileText, platforms: ["Meesho"] },
            { name: "Jiomart Seller Process", type: "Guide", icon: FileText, platforms: ["Jiomart"] },
            { name: "Zomato/Swiggy Vendor Onboarding", type: "Guide", icon: FileText, platforms: ["Zomato", "Swiggy"] },
          ],
        },
        {
          title: "Required Documents Checklist",
          items: [
            {
              name: "GSTIN, PAN, Bank Statement, FSSAI, Brand Logo & Product Photos",
              type: "Checklist",
              icon: List,
              platforms: ["All"],
              download: true,
            },
          ],
        },
      ],
    },
    {
      section: "Product Listings & Store Setup",
      content: [
        {
          title: "How to List Your First Product",
          items: [
            { name: "Product Title Writing Tips", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Image Size, Quality, and White Background Guide", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Variations & Bundling", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Sample Excel Sheet for Bulk Upload", type: "Excel", icon: Download, platforms: ["All"], download: true },
          ],
        },
        {
          title: "Brand Page Setup (Amazon & Flipkart)",
          items: [
            { name: "How to Create Your Brand Store", type: "Guide", icon: FileText, platforms: ["Amazon", "Flipkart"] },
            { name: "Banner Dimensions", type: "Guide", icon: FileText, platforms: ["Amazon", "Flipkart"] },
            { name: "Brand Story Formatting Tips", type: "Template", icon: Download, platforms: ["Amazon", "Flipkart"], download: true },
          ],
        },
      ],
    },
    {
      section: "Order Management & Inventory",
      content: [
        {
          title: "Managing Orders Across Platforms",
          items: [
            { name: "Accepting, Packing & Dispatching Orders", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Using Seller Panels", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Auto-Responses for Order Delay", type: "Guide", premium: true, icon: FileText, platforms: ["All"] },
            { name: "Inventory Sync Hacks", type: "Guide", icon: FileText, platforms: ["All"] },
          ],
        },
        {
          title: "Returns & Cancellations",
          items: [
            { name: "Common Return Reasons and How to Reduce Them", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Platform-wise Refund Handling", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Return Policy Tips", type: "Guide", icon: FileText, platforms: ["All"] },
          ],
        },
      ],
    },
    {
      section: "Marketing & Visibility",
      content: [
        {
          title: "Running Sponsored Ads",
          items: [
            { name: "Amazon Ads (Sponsored Product, Brand, Display)", type: "Guide", icon: FileText, platforms: ["Amazon"] },
            { name: "Flipkart PLA Setup", type: "Guide", icon: FileText, platforms: ["Flipkart"] },
            { name: "Meesho Campaigns", type: "Guide", icon: FileText, platforms: ["Meesho"] },
            { name: "Budgeting Tips + ROI Tracking Sheet", type: "Excel", icon: Download, platforms: ["All"], download: true },
          ],
        },
        {
          title: "Social Media Growth for Sellers",
          items: [
            { name: "How to Create Instagram Reels", type: "Guide", icon: Instagram, platforms: ["All"] },
            { name: "Caption Templates for Product Launches", type: "Template", icon: Download, platforms: ["All"], download: true },
            { name: "Free Content Calendar Template", type: "Template", icon: Download, platforms: ["All"], download: true },
          ],
        },
        {
          title: "Co-Branding Campaigns",
          items: [
            { name: "How to Partner with Other Sellers", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Example Festive Bundles", type: "Guide", icon: FileText, platforms: ["All"] },
            { name: "Co-Branded Packaging Checklist", type: "Checklist", icon: List, platforms: ["All"], download: true },
          ],
        },
      ],
    },
  ]

  const downloadableResources = [
    { name: "ONDC Seller Onboarding PDF", type: "PDF", icon: FileText, platforms: ["ONDC"] },
    { name: "Product Listing Excel Templates", type: "Excel", icon: Download, platforms: ["All"] },
    { name: "Brand Store Setup Kit", type: "Template", icon: Download, platforms: ["Amazon", "Flipkart"] },
    { name: "Campaign Planning Checklist", type: "Checklist", icon: List, platforms: ["All"] },
    { name: "Social Media Toolkit", type: "Template", icon: Instagram, platforms: ["All"] },
  ]

  const videoTutorials = [
    { name: "Seller Account Setup", duration: "3 min", platforms: ["All"] },
    { name: "Listing Your First Product", duration: "4 min", platforms: ["All"] },
    { name: "Managing Orders Daily", duration: "3 min", platforms: ["All"] },
    { name: "Running Sponsored Ads", duration: "5 min", platforms: ["All"] },
  ]

  const filteredGuides = guides
    .map((section) => ({
      ...section,
      content: section.content
        .map((content) => ({
          ...content,
          items: content.items.filter(
            (item) => activePlatform === "All" || item.platforms.includes(activePlatform)
          ),
        }))
        .filter((content) => content.items.length > 0),
    }))
    .filter((section) => section.content.length > 0)

  // Schema markup for learning resources
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Digital Commerce Guides & Tutorials",
    "description": "Comprehensive guides and tutorials for digital commerce success across multiple platforms including ONDC, Amazon, Flipkart, and more.",
    "provider": {
      "@type": "Organization",
      "name": "99DigiCom"
    },
    "learningResourceType": "Guide",
    "teaches": platforms.join(", "),
    "hasPart": guides.map(section => ({
      "@type": "CreativeWork",
      "name": section.section,
      "hasPart": section.content.flatMap(content => 
        content.items.map(item => ({
          "@type": "LearningResource",
          "name": item.name,
          "learningResourceType": item.type
        }))
      )
    }))
  }

  return (
    <>
      <Helmet>
        <title>Digital Commerce Guides & Tutorials | 99DigiCom Learning Center</title>
        <meta name="description" content="Master digital commerce with comprehensive guides, tutorials, and downloadable resources for ONDC, Amazon, Flipkart, and more platforms. Step-by-step instructions for sellers." />
        <meta name="keywords" content="digital commerce tutorials, seller guides, ONDC guide, Amazon seller tutorial, Flipkart seller guide" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(learningResourceSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">Guides</span> & Tutorials
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to sell smarter. Browse step-by-step guides, platform-specific tutorials, and downloadable resources to help you set up, manage, and grow your digital commerce presence.
            </p>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="guides-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="guides-heading" className="text-3xl font-bold text-gray-900 mb-4">Learn with Us</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Master digital commerce with our comprehensive resources.
              </p>
            </div>

            {/* Platform Filters */}
            <div 
              className="mb-12 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Filter guides by platform"
            >
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  role="tab"
                  aria-selected={activePlatform === platform}
                  aria-controls={`${platform}-content`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activePlatform === platform
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div>
              {filteredGuides.map((section) => (
                <div key={section.section} className="mb-6">
                  <button
                    onClick={() =>
                      setActiveAccordion(activeAccordion === section.section ? null : section.section)
                    }
                    aria-expanded={activeAccordion === section.section}
                    aria-controls={`section-${section.section}`}
                    className="w-full text-left bg-white rounded-lg shadow-lg p-6 flex justify-between items-center"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{section.section}</h3>
                    <span aria-hidden="true">{activeAccordion === section.section ? "−" : "+"}</span>
                  </button>
                  <div 
                    id={`section-${section.section}`}
                    className={`mt-4 space-y-6 ${(activeAccordion === section.section || section.expandedByDefault) ? '' : 'hidden'}`}
                  >
                    {section.content.map((content, index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-lg shadow-lg p-6"
                        role="region"
                        aria-labelledby={`content-${section.section}-${index}`}
                      >
                        <h4 id={`content-${section.section}-${index}`} className="text-lg font-semibold text-gray-900 mb-4">
                          {content.title}
                        </h4>
                        <ul className="space-y-4" role="list">
                          {content.items.map((item, itemIndex) => (
                            <li 
                              key={itemIndex} 
                              className="flex items-start"
                              aria-labelledby={`item-${section.section}-${index}-${itemIndex}`}
                            >
                              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                                <item.icon className="h-5 w-5 text-green-600" aria-hidden="true" />
                              </div>
                              <div>
                                <p id={`item-${section.section}-${index}-${itemIndex}`} className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-600">{item.type}</p>
                                {item.download && (
                                  <button 
                                    className="inline-flex items-center text-green-600 hover:text-green-800 mt-2"
                                    aria-label={`Download ${item.name}`}
                                  >
                                    <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                                    Download Now
                                  </button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Downloadable Resource Library */}
            <div className="mt-12" aria-labelledby="resources-heading">
              <h3 id="resources-heading" className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Downloadable Resource Library
              </h3>
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
              >
                {downloadableResources
                  .filter((resource) => activePlatform === "All" || resource.platforms.includes(activePlatform))
                  .map((resource, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-lg p-6 flex items-start"
                      role="listitem"
                    >
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                        <resource.icon className="h-5 w-5 text-green-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{resource.name}</p>
                        <p className="text-sm text-gray-600">{resource.type}</p>
                        <button 
                          className="inline-flex items-center text-green-600 hover:text-green-800 mt-2"
                          aria-label={`Download ${resource.name}`}
                        >
                          <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="mt-12" aria-labelledby="videos-heading">
              <h3 id="videos-heading" className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Video Tutorials (Coming Soon)
              </h3>
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
              >
                {videoTutorials
                  .filter((video) => activePlatform === "All" || video.platforms.includes(activePlatform))
                  .map((video, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-lg p-6 flex items-start"
                      role="listitem"
                    >
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                        <Video className="h-5 w-5 text-green-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{video.name}</p>
                        <p className="text-sm text-gray-600">{video.duration}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default GuidesTutorials