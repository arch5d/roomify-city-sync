
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import FooterSection from '@/components/home/FooterSection';
import PropertyCard from '@/components/PropertyCard';
import FilterPanel from '@/components/FilterPanel';
import GoogleMap from '@/components/GoogleMap';
import { useFilteredProperties } from '@/hooks/useFilteredProperties';

const Index = () => {
  const [realProperties, setRealProperties] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showMap, setShowMap] = useState(false);
  const { properties, filters, setFilters } = useFilteredProperties();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active');
    
    setRealProperties(data || []);
  };

  // Convert database properties to the format expected by existing components
  const convertedProperties = realProperties.map(prop => ({
    id: prop.id,
    title: prop.title,
    location: prop.location,
    price: prop.price_per_month,
    rating: 4.5, // Default rating until we calculate from reviews
    reviews: 10, // Default review count
    image: prop.images?.[0] || '/placeholder.svg',
    amenities: prop.amenities || [],
    verified: prop.verified,
    type: prop.property_type,
    gender: prop.gender_preference,
    latitude: prop.latitude || 12.9716 + (Math.random() - 0.5) * 0.1,
    longitude: prop.longitude || 77.5946 + (Math.random() - 0.5) * 0.1,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      
      {/* Properties Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Room
            </h2>
            <p className="text-xl text-gray-600">
              Browse through our verified properties and find your ideal home
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setShowMap(false)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  !showMap ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setShowMap(true)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  showMap ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Map View
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <FilterPanel 
                filters={filters}
                onFiltersChange={setFilters}
                totalProperties={convertedProperties.length}
              />
            </div>
            
            <div className="lg:col-span-3">
              {showMap ? (
                <GoogleMap
                  properties={convertedProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={setSelectedProperty}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {convertedProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onHover={setSelectedProperty}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Index;
