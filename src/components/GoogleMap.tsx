
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  latitude: number;
  longitude: number;
  image: string;
  rating: number;
}

interface GoogleMapProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  selectedProperty?: Property | null;
}

// Declare global google types
declare global {
  interface Window {
    google: typeof google;
  }
}

const GoogleMap = ({ properties, onPropertySelect, selectedProperty }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 12.9716, lng: 77.5946 }, // Bangalore center
      zoom: 11,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (!map || !properties.length || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    // Create new markers
    const newMarkers = properties.map(property => {
      const marker = new window.google.maps.Marker({
        position: { lat: property.latitude, lng: property.longitude },
        map: map,
        title: property.title,
        icon: {
          url: selectedProperty?.id === property.id ? 
            'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#10b981" stroke="white" stroke-width="4"/>
                <text x="20" y="27" text-anchor="middle" fill="white" font-size="14" font-weight="bold">₹${Math.round(property.price/1000)}k</text>
              </svg>
            `) :
            'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="4"/>
                <text x="20" y="27" text-anchor="middle" fill="white" font-size="14" font-weight="bold">₹${Math.round(property.price/1000)}k</text>
              </svg>
            `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20)
        }
      });

      marker.addListener('click', () => {
        onPropertySelect?.(property);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Fit bounds to show all markers
    if (properties.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      properties.forEach(property => {
        bounds.extend({ lat: property.latitude, lng: property.longitude });
      });
      map.fitBounds(bounds);
    }
  }, [map, properties, selectedProperty, onPropertySelect]);

  return (
    <div className="relative w-full h-[500px]">
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />
      
      {selectedProperty && (
        <Card className="absolute bottom-4 left-4 right-4 max-w-sm mx-auto shadow-xl">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{selectedProperty.title}</h3>
                <p className="text-xs text-gray-600 truncate">{selectedProperty.location}</p>
                <p className="text-lg font-bold text-blue-600">₹{selectedProperty.price.toLocaleString()}/month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoogleMap;
