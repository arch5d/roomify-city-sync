
import { useState, useEffect, useMemo } from 'react';
import { realProperties } from '../data/realProperties';

interface Filters {
  priceRange: [number, number];
  amenities: string[];
  propertyType: string;
  genderPreference: string;
  occupancy: string;
  verifiedOnly: boolean;
}

export const useFilteredProperties = () => {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [5000, 50000],
    amenities: [],
    propertyType: 'all',
    genderPreference: 'any',
    occupancy: 'any',
    verifiedOnly: false
  });

  const filteredProperties = useMemo(() => {
    return realProperties.filter(property => {
      // Price filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Property type filter
      if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
        return false;
      }

      // Gender preference filter
      if (filters.genderPreference !== 'any' && property.gender !== filters.genderPreference && property.gender !== 'Any') {
        return false;
      }

      // Verified filter
      if (filters.verifiedOnly && !property.verified) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return {
    properties: filteredProperties,
    filters,
    setFilters,
    totalCount: realProperties.length,
    filteredCount: filteredProperties.length
  };
};
