import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Server, Megaphone, Users, Building } from 'lucide-react';

const CreateApplication = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const applicationTypes = [
    {
      id: 'platform',
      title: 'Platform Enablement',
      icon: Server,
      route: '/dashboard/create-application/platform',
      description: 'Enable your platform with our advanced technology solutions'
    },
    {
      id: 'ams',
      title: 'AMS',
      icon: Building,
      route: '/dashboard/create-application/ams',
      description: 'Application Management Services for your business needs'
    },
    {
      id: 'advertising',
      title: 'Advertising & Marketing',
      icon: Megaphone,
      route: '/dashboard/create-application/advertising',
      description: 'Boost your brand with our advertising and marketing solutions'
    },
    {
      id: 'cobranding',
      title: 'Co-Branding',
      icon: Users,
      route: '/dashboard/create-application/cobranding',
      description: 'Partner with us for co-branding opportunities'
    }
  ];

  const handleOptionSelect = (route) => {
    navigate(route);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create New Application</h1>
      <p className="text-gray-600 mb-8">Select the type of application you want to create:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applicationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleOptionSelect(type.route)}
            className="flex items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
          >
            <div className="mr-4 p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <type.icon className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-medium text-gray-800">{type.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{type.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CreateApplication; 