
import { Heart, Star, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  verified: boolean;
  type: string;
  gender: string;
}

interface PropertyCardProps {
  property: Property;
  onHover?: (property: Property | null) => void;
}

const PropertyCard = ({ property, onHover }: PropertyCardProps) => {
  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white cursor-pointer"
      onMouseEnter={() => onHover?.(property)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {property.verified && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              <Shield className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {property.type}
          </Badge>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-3 right-3 bg-white/80 hover:bg-white hover:text-red-500 transition-colors"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-500">({property.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{property.gender}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {property.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{property.price.toLocaleString()}</span>
            <span className="text-gray-600 text-sm">/month</span>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
