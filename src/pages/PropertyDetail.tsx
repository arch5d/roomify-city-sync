
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Shield, Users, MapPin, Calendar, Phone, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PropertyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProperty();
      fetchReviews();
      checkIfSaved();
    }
  }, [id, user]);

  const fetchProperty = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        profiles!properties_owner_id_fkey (
          full_name,
          phone
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Property not found",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setProperty(data);
    setLoading(false);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('property_reviews')
      .select(`
        *,
        profiles!property_reviews_user_id_fkey (full_name)
      `)
      .eq('property_id', id);

    setReviews(data || []);
  };

  const checkIfSaved = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', user.id)
      .eq('property_id', id)
      .single();

    setIsSaved(!!data);
  };

  const toggleSaved = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      if (isSaved) {
        await supabase
          .from('saved_properties')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', id);
        setIsSaved(false);
        toast({ title: "Removed from saved properties" });
      } else {
        await supabase
          .from('saved_properties')
          .insert([{ user_id: user.id, property_id: id }]);
        setIsSaved(true);
        toast({ title: "Added to saved properties" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Property not found</div>;
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{property.title}</CardTitle>
                    <div className="flex items-center mt-2 text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}, {property.city}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleSaved}
                    className={isSaved ? 'text-red-500' : 'text-gray-400'}
                  >
                    <Heart className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  {property.verified && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="outline">{property.property_type}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  ₹{property.price_per_month.toLocaleString()}/month
                </div>
                
                {property.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{property.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Property Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Gender: {property.gender_preference}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Available from: {new Date(property.available_from).toLocaleDateString()}</span>
                      </div>
                      {property.security_deposit && (
                        <div>Security Deposit: ₹{property.security_deposit.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity: string) => (
                        <Badge key={amenity} variant="outline">{amenity}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {property.address && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <p className="text-gray-700">{property.address}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.profiles.full_name}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.review_text && <p className="text-gray-700">{review.review_text}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">{property.profiles.full_name}</p>
                    <p className="text-gray-600">Property Owner</p>
                  </div>
                  
                  {property.profiles.phone && (
                    <Button className="w-full" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Owner
                    </Button>
                  )}
                  
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
