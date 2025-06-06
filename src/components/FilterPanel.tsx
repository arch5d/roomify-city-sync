
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Wifi, Car, Home, Zap, Droplets, Wind, Utensils, Dumbbell } from 'lucide-react';

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
}

const FilterPanel = ({ onFiltersChange }: FilterPanelProps) => {
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState('all');
  const [genderPreference, setGenderPreference] = useState('any');
  const [occupancy, setOccupancy] = useState('any');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const amenities = [
    { id: 'Wi-Fi', label: 'Wi-Fi', icon: Wifi },
    { id: 'Parking', label: 'Parking', icon: Car },
    { id: 'Furnished', label: 'Furnished', icon: Home },
    { id: 'AC', label: 'AC', icon: Wind },
    { id: 'Geyser', label: 'Geyser', icon: Zap },
    { id: 'RO Water', label: 'RO Water', icon: Droplets },
    { id: 'Food Included', label: 'Food Included', icon: Utensils },
    { id: 'Gym', label: 'Gym', icon: Dumbbell },
  ];

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    let newAmenities;
    if (checked) {
      newAmenities = [...selectedAmenities, amenityId];
    } else {
      newAmenities = selectedAmenities.filter(id => id !== amenityId);
    }
    setSelectedAmenities(newAmenities);
    emitFilterChange({ amenities: newAmenities });
  };

  const emitFilterChange = (newFilter: any = {}) => {
    const filters = {
      priceRange,
      amenities: selectedAmenities,
      propertyType,
      genderPreference,
      occupancy,
      verifiedOnly,
      ...newFilter
    };
    onFiltersChange(filters);
  };

  const handlePriceChange = (newPriceRange: number[]) => {
    setPriceRange(newPriceRange);
    emitFilterChange({ priceRange: newPriceRange });
  };

  const clearFilters = () => {
    setPriceRange([5000, 50000]);
    setSelectedAmenities([]);
    setPropertyType('all');
    setGenderPreference('any');
    setOccupancy('any');
    setVerifiedOnly(false);
    onFiltersChange({
      priceRange: [5000, 50000],
      amenities: [],
      propertyType: 'all',
      genderPreference: 'any',
      occupancy: 'any',
      verifiedOnly: false
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 shadow-lg border-0">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Property Type</Label>
            <Select value={propertyType} onValueChange={(value) => {
              setPropertyType(value);
              emitFilterChange({ propertyType: value });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PG">PG</SelectItem>
                <SelectItem value="Room">Room</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender Preference */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Gender</Label>
            <Select value={genderPreference} onValueChange={(value) => {
              setGenderPreference(value);
              emitFilterChange({ genderPreference: value });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Occupancy */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Occupancy</Label>
            <Select value={occupancy} onValueChange={(value) => {
              setOccupancy(value);
              emitFilterChange({ occupancy: value });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select occupancy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="triple">Triple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Verified Only */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Verification</Label>
            <div className="flex items-center space-x-2 h-10">
              <Checkbox 
                id="verified" 
                checked={verifiedOnly}
                onCheckedChange={(checked) => {
                  setVerifiedOnly(checked as boolean);
                  emitFilterChange({ verifiedOnly: checked });
                }}
              />
              <Label htmlFor="verified" className="text-sm">Verified only</Label>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-6">
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">
            Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={100000}
            min={1000}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                />
                <Label htmlFor={amenity.id} className="text-sm flex items-center gap-2 cursor-pointer">
                  <amenity.icon className="h-4 w-4 text-gray-500" />
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" className="flex-1" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" onClick={() => emitFilterChange()}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
