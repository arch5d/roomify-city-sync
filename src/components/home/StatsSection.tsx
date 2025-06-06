
import { Users, Home, Shield, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Home,
      value: "10,000+",
      label: "Verified Properties",
      color: "text-blue-600"
    },
    {
      icon: Users,
      value: "50,000+",
      label: "Happy Tenants",
      color: "text-green-600"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Verified Listings",
      color: "text-purple-600"
    },
    {
      icon: Star,
      value: "4.8",
      label: "Average Rating",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
