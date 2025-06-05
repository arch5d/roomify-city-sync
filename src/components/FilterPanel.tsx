
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Wifi, Car, Home, Zap, Droplets, Wind, Utensils, Dumbbell } from 'lucide-react';

const FilterPanel = () => {
  const [priceRange, setPriceRange] = useState([5000, 50000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenities = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'furnished', label: 'Furnished', icon: Home },
    { id: 'ac', label: 'AC', icon: Wind },
    { id: 'geyser', label: 'Geyser', icon: Zap },
    { id: 'ro-water', label: 'RO Water', icon: Droplets },
    { id: 'food', label: 'Food Included', icon: Utensils },
    { id: 'gym', label: 'Gym', icon: Dumbbell },
  ];

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8 shadow-lg border-0">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Property Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Property Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pg">PG</SelectItem>
                <SelectItem value="room">Room</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender Preference */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Gender</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Occupancy */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Occupancy</Label>
            <Select>
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
              <Checkbox id="verified" />
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
            onValueChange={setPriceRange}
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
          <Button variant="outline" className="flex-1">
            Clear Filters
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
