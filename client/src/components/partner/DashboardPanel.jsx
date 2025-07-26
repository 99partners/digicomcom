import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DashboardPanel = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [expandedSections, setExpandedSections] = useState({
    identification: true,
    contact: true,
    mandate: true,
    funding: true,
    collaboration: true,
    implementation: true,
    other: true,
  });

  const tabs = ['OVERVIEW', 'UN DATA', 'PSEA'];
  
  const sections = [
    { id: 'identification', title: 'Identification' },
    { id: 'contact', title: 'Contact Information' },
    { id: 'mandate', title: 'Mandate & Mission' },
    { id: 'funding', title: 'Funding' },
    { id: 'collaboration', title: 'Collaboration' },
    { id: 'implementation', title: 'Project Implementation' },
    { id: 'other', title: 'Other Information' },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-8 px-2 sm:px-4">
      <div className="bg-white rounded-lg shadow p-3 sm:p-6">
        {/* Tabs */}
        <div className="border-b mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex space-x-2 sm:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 sm:py-4 px-2 -mb-px font-medium text-xs sm:text-sm ${
                  activeTab === tab
                    ? 'border-b-2 border-green-600 text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4 sm:space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="border rounded-lg bg-white">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-3 sm:p-4 text-left"
              >
                <h3 className="text-base sm:text-lg font-medium text-gray-900">{section.title}</h3>
                {expandedSections[section.id] ? (
                  <ChevronUp className="text-gray-500" size={20} />
                ) : (
                  <ChevronDown className="text-gray-500" size={20} />
                )}
              </button>
              
              {expandedSections[section.id] && (
                <div className="p-3 sm:p-4 border-t bg-gray-50">
                  <p className="text-gray-500 text-xs sm:text-sm">
                    This is a placeholder for the {section.title.toLowerCase()} section content.
                    In a real application, this would contain forms and data relevant to this section.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;