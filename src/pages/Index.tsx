
import { useState } from 'react';
import { Search, Filter, Grid, MapPin as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import PropertyCard from '@/components/PropertyCard';
import FilterPanel from '@/components/FilterPanel';
import GoogleMap from '@/components/GoogleMap';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import FooterSection from '@/components/home/FooterSection';
import { useFilteredProperties } from '@/hooks/useFilteredProperties';

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  
  const { properties, filters, setFilters, totalCount, filteredCount } = useFilteredProperties();

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredByLocation = searchLocation 
    ? properties.filter(property => 
        property.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        property.title.toLowerCase().includes(searchLocation.toLowerCase())
      )
    : properties;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <HeroSection 
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Filter Panel */}
      {showFilters && (
        <div className="px-4 animate-fade-in">
          <FilterPanel onFiltersChange={handleFiltersChange} />
        </div>
      )}

      <StatsSection />

      {/* Search Results */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {searchLocation ? `Properties in "${searchLocation}"` : 'All Properties'}
              </h2>
              <p className="text-gray-600">
                Showing {filteredByLocation.length} of {totalCount} properties
              </p>
              {filters.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-sm text-gray-600">Filtered by:</span>
                  {filters.amenities.map(amenity => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <MapIcon className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredByLocation.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onHover={setSelectedProperty}
                />
              ))}
            </div>
          ) : (
            <GoogleMap 
              properties={filteredByLocation}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />
          )}

          {filteredByLocation.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchLocation('');
                  setFilters({
                    priceRange: [5000, 50000],
                    amenities: [],
                    propertyType: 'all',
                    genderPreference: 'any',
                    occupancy: 'any',
                    verifiedOnly: false
                  });
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <FeaturesSection />
      <FooterSection />
    </div>
  );
};

export default Index;
