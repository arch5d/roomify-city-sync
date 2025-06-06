
import { Shield, Search, MapPin, Clock, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All properties are verified by our team to ensure quality and authenticity."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find your perfect room with our advanced search and filter options."
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Properties in the best locations with easy access to transport and amenities."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any queries or issues."
    },
    {
      icon: Users,
      title: "Community",
      description: "Join a community of like-minded students and professionals."
    },
    {
      icon: Star,
      title: "Top Rated",
      description: "Highly rated properties with excellent reviews from previous tenants."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose RoomiFy?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make finding your perfect room simple, safe, and stress-free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-600 mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
