
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Home, Heart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserProperties();
      fetchSavedProperties();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();
    setProfile(data);
  };

  const fetchUserProperties = async () => {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', user?.id);
    setProperties(data || []);
  };

  const fetchSavedProperties = async () => {
    const { data } = await supabase
      .from('saved_properties')
      .select(`
        *,
        properties (*)
      `)
      .eq('user_id', user?.id);
    setSavedProperties(data || []);
  };

  const isOwner = profile?.user_type === 'owner';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {profile?.full_name || user?.email}!
          </h1>
          <p className="text-gray-600">
            {isOwner ? 'Manage your properties and bookings' : 'Find your perfect room'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Home className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {isOwner ? 'My Properties' : 'Available Properties'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isOwner ? properties.length : '100+'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                  <p className="text-2xl font-bold text-gray-900">{savedProperties.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Account Type</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">{profile?.user_type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {isOwner && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
              <Button onClick={() => navigate('/add-property')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <p className="text-2xl font-bold text-blue-600">₹{property.price_per_month.toLocaleString()}/month</p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/property/${property.id}`)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/edit-property/${property.id}`)}>
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isOwner ? 'Recent Activity' : 'Saved Properties'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((saved) => (
              <Card key={saved.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{saved.properties.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{saved.properties.location}</p>
                  <p className="text-2xl font-bold text-blue-600">₹{saved.properties.price_per_month.toLocaleString()}/month</p>
                  <Button size="sm" className="mt-4" onClick={() => navigate(`/property/${saved.properties.id}`)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
