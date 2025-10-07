"use client";

import { Helmet } from "react-helmet";
import { useState } from "react";
import { FileText, Download, Video, List, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

const GuidesTutorials = () => {
  const { t } = useTranslation();
  const [activePlatform, setActivePlatform] = useState(t("guides.platforms.all"));
  const [activeAccordion, setActiveAccordion] = useState(t("guides.sections.gettingStarted"));

  const platformsData = t("guides.platforms.list", { returnObjects: true });
  const platforms = Array.isArray(platformsData) ? platformsData : [];

  const guideSections = t("guides.sections.list", { returnObjects: true }) || [];

  const guides = Array.isArray(guideSections)
    ? guideSections.map((section) => ({
        section: section.title,
        expandedByDefault: section.expandedByDefault,
        content: section.content.map((contentItem) => ({
          title: contentItem.title,
          items: contentItem.items.map((item) => ({
            name: item.name,
            type: item.type,
            icon: {
              FileText: FileText,
              Download: Download,
              List: List,
              Instagram: Instagram,
              Video: Video,
            }[item.icon] || FileText,
            platforms: item.platforms,
            download: item.download,
            premium: item.premium,
          })),
        })),
      }))
    : [];

  const downloadableResourcesData = t("guides.downloadableResources", { returnObjects: true }) || [];
  const downloadableResources = Array.isArray(downloadableResourcesData)
    ? downloadableResourcesData.map((resource) => ({
        ...resource,
        icon: {
          FileText: FileText,
          Download: Download,
          List: List,
          Instagram: Instagram,
        }[resource.icon] || FileText,
      }))
    : [];

  const videoTutorials = t("guides.videoTutorials", { returnObjects: true }) || [];

  const filteredGuides = Array.isArray(guides)
    ? guides
        .map((section) => ({
          ...section,
          content: Array.isArray(section.content)
            ? section.content
                .map((content) => ({
                  ...content,
                  items: Array.isArray(content.items)
                    ? content.items.filter(
                        (item) =>
                          activePlatform === "All" ||
                          (Array.isArray(item.platforms) && item.platforms.includes(activePlatform))
                      )
                    : [],
                }))
                .filter((content) => content.items && content.items.length > 0)
            : [],
        }))
        .filter((section) => section.content && section.content.length > 0)
    : [];

  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": t("guides.schema.name"),
    "description": t("guides.schema.description"),
    "provider": {
      "@type": "Organization",
      "name": t("common.companyName"),
    },
    "learningResourceType": "Guide",
    "teaches": Array.isArray(platforms) ? platforms.join(", ") : "",
    "hasPart": Array.isArray(guides)
      ? guides.map((section) => ({
          "@type": "CreativeWork",
          "name": section.section,
          "hasPart": Array.isArray(section.content)
            ? section.content.flatMap((content) =>
                Array.isArray(content.items)
                  ? content.items.map((item) => ({
                      "@type": "LearningResource",
                      "name": item.name,
                      "learningResourceType": item.type,
                    }))
                  : []
              )
            : [],
        }))
      : [],
  };

  return (
    <>
      <Helmet>
        <title>{t("guides.seo.title")}</title>
        <meta name="description" content={t("guides.seo.description")} />
        <meta name="keywords" content={t("guides.seo.keywords")} />
        <link rel="canonical" href={window.location.href} />
       
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t("guides.seo.title")} />
        <meta property="og:description" content={t("guides.seo.description")} />
        <meta property="og:image" content="https://99digicom.com/og-image.jpg" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("guides.seo.title")} />
        <meta name="twitter:description" content={t("guides.seo.description")} />
        <meta name="twitter:image" content="https://99digicom.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(learningResourceSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-green-600">{t("guides.hero.titleHighlight")}</span>{" "}
              {t("guides.hero.titleRest")}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("guides.hero.description")}</p>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="guides-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="guides-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t("guides.learning.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("guides.learning.description")}</p>
            </div>

            {/* Platform Filters */}
            <div
              className="mb-12 flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label={t("guides.platformFilter.ariaLabel")}
            >
              {Array.isArray(platforms) &&
                platforms.map((platform) => (
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
                    {t(`guides.platforms.${platform.toLowerCase()}`)}
                  </button>
                ))}
            </div>

            {/* Main Content */}
            <div>
              {Array.isArray(filteredGuides) &&
                filteredGuides.map((section) => (
                  <div key={section.section} className="mb-6">
                    <button
                      onClick={() =>
                        setActiveAccordion(activeAccordion === section.section ? null : section.section)
                      }
                      aria-expanded={activeAccordion === section.section}
                      aria-controls={`section-${section.section}`}
                      className="w-full text-left bg-white rounded-lg shadow-lg p-6 flex justify-between items-center"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">{t(section.section)}</h3>
                      <span aria-hidden="true">
                        {activeAccordion === section.section
                          ? t("guides.accordion.collapse")
                          : t("guides.accordion.expand")}
                      </span>
                    </button>
                    <div
                      id={`section-${section.section}`}
                      className={`mt-4 space-y-6 ${
                        activeAccordion === section.section || section.expandedByDefault ? "" : "hidden"
                      }`}
                    >
                      {Array.isArray(section.content) &&
                        section.content.map((content, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6"
                            role="region"
                            aria-labelledby={`content-${section.section}-${index}`}
                          >
                            <h4
                              id={`content-${section.section}-${index}`}
                              className="text-lg font-semibold text-gray-900 mb-4"
                            >
                              {content.title}
                            </h4>
                            <ul className="space-y-4" role="list">
                              {Array.isArray(content.items) &&
                                content.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start"
                                    aria-labelledby={`item-${section.section}-${index}-${itemIndex}`}
                                  >
                                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-4">
                                      <item.icon className="h-5 w-5 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div>
                                      <p
                                        id={`item-${section.section}-${index}-${itemIndex}`}
                                        className="text-sm font-medium text-gray-900"
                                      >
                                        {item.name}
                                      </p>
                                      <p className="text-sm text-gray-600">{item.type}</p>
                                      {item.download && (
                                        <button
                                          className="inline-flex items-center text-green-600 hover:text-green-800 mt-2"
                                          aria-label={`Download ${item.name}`}
                                        >
                                          <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                                          {t("guides.resources.download")}
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
                {t("guides.resources.heading")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                {Array.isArray(downloadableResources) &&
                  downloadableResources
                    .filter(
                      (resource) =>
                        activePlatform === "All" ||
                        (Array.isArray(resource.platforms) && resource.platforms.includes(activePlatform))
                    )
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
                            {t("guides.resources.download")}
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="mt-12" aria-labelledby="videos-heading">
              <h3 id="videos-heading" className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {t("guides.videos.heading")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
                {Array.isArray(videoTutorials) &&
                  videoTutorials
                    .filter(
                      (video) =>
                        activePlatform === "All" ||
                        (Array.isArray(video.platforms) && video.platforms.includes(activePlatform))
                    )
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
  );
};
// hello
export default GuidesTutorials;