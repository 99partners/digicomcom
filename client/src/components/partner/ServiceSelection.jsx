import { useNavigate } from 'react-router-dom';

const ServiceSelection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'platform',
      title: 'Platform Enablement',
      description: 'Get your business online with our comprehensive platform enablement services',
      icon: '🚀',
      route: '/dashboard/create-application/platform'
    },
    {
      id: 'ams',
      title: 'Account Management Services (AMS)',
      description: 'Professional account management to optimize your online presence',
      icon: '📊',
      route: '/dashboard/create-application/ams'
    },
    {
      id: 'marketing',
      title: 'Marketing Services',
      description: 'Boost your visibility with our targeted marketing solutions',
      icon: '📈',
      route: '/dashboard/create-application/marketing'
    },
    {
      id: 'cobranding',
      title: 'Co-Branding Partnership',
      description: 'Partner with us to expand your brand reach and market presence',
      icon: '🤝',
      route: '/dashboard/create-application/cobranding'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Service</h1>
          <p className="text-lg text-gray-600">Select the type of service you're interested in</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => navigate(service.route)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-green-500"
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl">{service.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection; 