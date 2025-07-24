import { useNavigate } from 'react-router-dom';

const ServiceSelection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'platform',
      title: 'Launch',
      description: 'Get your business online with our comprehensive platform enablement services',
      icon: '🚀',
      route: '/partner/create-application/platform',
      bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100'
    },
    {
      id: 'ams',
      title: 'Manage',
      description: 'Professional account management to optimize your online presence',
      icon: '📊',
      route: '/partner/create-application/ams',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    {
      id: 'advertising',
      title: 'Grow',
      description: 'Boost your visibility with our targeted marketing solutions',
      icon: '📈',
      route: '/partner/create-application/advertising',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100'
    },
    {
      id: 'cobranding',
      title: 'Co-Branding Solutions',
      description: 'Partner with us to expand your brand reach and market presence',
      icon: '🤝',
      route: '/partner/create-application/cobranding',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Service</h1>
        <p className="text-lg text-gray-600">Select the type of service you're interested in</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => navigate(service.route)}
            className={`${service.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100`}
          >
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="text-2xl">{service.icon}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection; 