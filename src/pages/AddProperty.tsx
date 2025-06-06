
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    city: '',
    state: 'Karnataka',
    address: '',
    property_type: 'PG',
    price_per_month: '',
    security_deposit: '',
    gender_preference: 'Any',
    amenities: [] as string[],
  });

  const amenitiesList = [
    'WiFi', 'AC', 'Parking', 'Laundry', 'Kitchen', 'Gym', 'Security', 'Power Backup'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('properties')
        .insert([{
          ...formData,
          owner_id: user?.id,
          price_per_month: parseInt(formData.price_per_month),
          security_deposit: formData.security_deposit ? parseInt(formData.security_deposit) : null,
        }]);

      if (error) throw error;

      toast({
        title: "Property added successfully!",
        description: "Your property is now live on RoomiFy.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Property</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="property_type">Property Type</Label>
                  <select
                    id="property_type"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="PG">PG</option>
                    <option value="Flat">Flat</option>
                    <option value="Room">Room</option>
                    <option value="Studio">Studio</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="gender_preference">Gender Preference</Label>
                  <select
                    id="gender_preference"
                    name="gender_preference"
                    value={formData.gender_preference}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Any">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price_per_month">Monthly Rent (₹)</Label>
                  <Input
                    id="price_per_month"
                    name="price_per_month"
                    type="number"
                    value={formData.price_per_month}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="security_deposit">Security Deposit (₹)</Label>
                  <Input
                    id="security_deposit"
                    name="security_deposit"
                    type="number"
                    value={formData.security_deposit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {amenitiesList.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Property'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProperty;
