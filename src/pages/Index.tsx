
import { useState } from 'react';
import { Search, MapPin, Star, Wifi, Car, Home, Users, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import FilterPanel from '@/components/FilterPanel';

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');

  const featuredProperties = [
    {
      id: 1,
      title: "Modern PG Near Tech Park",
      location: "Koramangala, Bangalore",
      price: 15000,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg",
      amenities: ["Wi-Fi", "AC", "Geyser", "RO Water"],
      verified: true,
      type: "PG",
      gender: "Male"
    },
    {
      id: 2,
      title: "Cozy Studio Apartment",
      location: "Bandra West, Mumbai",
      price: 25000,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg",
      amenities: ["Wi-Fi", "Fully Furnished", "Kitchen", "Parking"],
      verified: true,
      type: "Apartment",
      gender: "Any"
    },
    {
      id: 3,
      title: "Spacious Room in Villa",
      location: "Sector 14, Gurgaon",
      price: 18000,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg",
      amenities: ["Wi-Fi", "AC", "Laundry", "Garden"],
      verified: false,
      type: "Room",
      gender: "Female"
    },
    {
      id: 4,
      title: "Premium PG with All Amenities",
      location: "Whitefield, Bangalore",
      price: 20000,
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg",
      amenities: ["Wi-Fi", "AC", "Gym", "Food Included"],
      verified: true,
      type: "PG",
      gender: "Any"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> Room</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover verified PGs and rooms tailored for students and professionals. 
            Your next home is just a click away.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 mb-8 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  placeholder="Enter city, area, or landmark"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline" 
                className="h-14 px-6 border-gray-200 hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
              <Button className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg font-semibold">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="animate-fade-in">
              <FilterPanel />
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Verified Properties</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Tenants</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked accommodations that offer the best value and experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose ROOMIFY?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Properties</h3>
              <p className="text-blue-100">All properties undergo strict verification with AI-powered document scanning</p>
            </div>
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Community</h3>
              <p className="text-blue-100">Connect with verified property owners and genuine reviews from real tenants</p>
            </div>
            <div className="animate-fade-in">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Best Experience</h3>
              <p className="text-blue-100">Smart filters, instant booking, and 24/7 support for seamless experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">ROOMIFY</h3>
              <p className="text-gray-400">Making relocation easier for students and professionals across India.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Find Rooms</li>
                <li>PG Accommodations</li>
                <li>Apartments</li>
                <li>Map Search</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Owners</h4>
              <ul className="space-y-2 text-gray-400">
                <li>List Property</li>
                <li>Manage Listings</li>
                <li>Verification</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ROOMIFY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
