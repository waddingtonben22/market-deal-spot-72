import { Business } from '@/types/business';
import { BUSINESS_CATEGORIES } from '@/types/business';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, TrendingUp } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  onClick: () => void;
}

export const BusinessCard = ({ business, onClick }: BusinessCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className="cursor-pointer group"
      onClick={onClick}
    >
      {/* Square Image */}
      <div className="aspect-square overflow-hidden rounded-lg mb-2 bg-gray-100">
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      
      {/* Content - Facebook Marketplace style */}
      <div className="space-y-0.5">
        {/* Price - Large and prominent */}
        <div className="text-lg font-semibold text-black group-hover:underline">
          {formatPrice(business.price)}
        </div>
        
        {/* Title */}
        <div className="text-sm text-black line-clamp-2 leading-tight group-hover:underline">
          {business.name}
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-600 group-hover:underline">
          <MapPin className="w-3 h-3" />
          <span>{business.location}</span>
        </div>
      </div>
    </div>
  );
};