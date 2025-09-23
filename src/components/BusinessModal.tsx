import { Business } from '@/types/business';
import { BUSINESS_CATEGORIES } from '@/types/business';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Phone, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

interface BusinessModalProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessModal = ({ business, isOpen, onClose }: BusinessModalProps) => {
  if (!business) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border shadow-modal">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {business.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
              <img
                src={business.imageUrl}
                alt={business.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quick Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(business.price)}
                </span>
                {business.isNegotiable && (
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-sm ml-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Negotiable
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">{business.location}</span>
              </div>

              {business.revenue && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    Revenue: {formatRevenue(business.revenue)}
                  </span>
                </div>
              )}

              {business.established && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Established: {business.established}
                  </span>
                </div>
              )}
              
              <Badge 
                className="text-sm font-medium bg-opacity-10 border-current w-fit"
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
          
          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Business Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {business.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Financial Overview
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Asking Price:</span>
                  <div className="font-semibold text-primary">{formatPrice(business.price)}</div>
                </div>
                {business.revenue && (
                  <div>
                    <span className="text-muted-foreground">Revenue:</span>
                    <div className="font-semibold text-green-600">{formatRevenue(business.revenue)}</div>
                  </div>
                )}
                {business.established && (
                  <div>
                    <span className="text-muted-foreground">Years Operating:</span>
                    <div className="font-semibold">{new Date().getFullYear() - business.established} years</div>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <div className="font-semibold text-green-600">Available</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Key Highlights
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Established business with proven track record</li>
                <li>• Loyal customer base and strong reputation</li>
                <li>• Prime location with high foot traffic</li>
                <li>• All equipment and inventory included</li>
                <li>• Comprehensive training and transition support</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Click to view seller contact information
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};