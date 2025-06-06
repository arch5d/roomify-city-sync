
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroSectionProps {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const HeroSection = ({ 
  searchLocation, 
  setSearchLocation, 
  showFilters, 
  setShowFilters 
}: HeroSectionProps) => {
  return (
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
              <Input 
                placeholder="Enter city, area, or landmark"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="h-14 text-lg border-0 focus:ring-2 focus:ring-blue-500"
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
      </div>
    </section>
  );
};

export default HeroSection;
