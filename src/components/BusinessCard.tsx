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
  const category = BUSINESS_CATEGORIES.find(cat => cat.value === business.category);
  const categoryColor = `category-${business.category}`;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatRevenue = (revenue: { amount: number; period: 'month' | 'year' }) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(revenue.amount);
    return `${formatted}/${revenue.period === 'month' ? 'month' : 'year'}`;
  };

  return (
    <Card 
      className="cursor-pointer group transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 bg-gradient-card border-border overflow-hidden"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {business.isNegotiable && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
              Negotiable
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {business.name}
        </h3>
        
        {/* Price */}
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-xl font-bold text-primary">
            {formatPrice(business.price)}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {business.shortDescription}
        </p>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{business.location}</span>
        </div>
        
        {/* Category Badge */}
        <div className="pt-2">
          <Badge 
            className="text-xs font-medium bg-opacity-10 border-current w-fit"
            style={{ 
              backgroundColor: `hsl(var(--${categoryColor}) / 0.1)`,
              color: `hsl(var(--${categoryColor}))`,
              borderColor: `hsl(var(--${categoryColor}) / 0.3)`
            }}
          >
            {category?.label}
          </Badge>
        </div>
      </div>
    </Card>
  );
};