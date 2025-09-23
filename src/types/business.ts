export interface Business {
  id: number;
  name: string;
  price: number;
  location: string;
  category: 'tech' | 'restaurant' | 'retail' | 'manufacturing' | 'services';
  description: string;
  shortDescription: string;
  imageUrl: string;
  isAd?: boolean;
  revenue?: {
    amount: number;
    period: 'month' | 'year';
  };
  established?: number;
  isNegotiable?: boolean;
  status?: 'available' | 'sold' | 'pending';
}

export const BUSINESS_CATEGORIES = [
  { value: 'tech', label: 'Technology', color: 'category-tech' },
  { value: 'restaurant', label: 'Restaurant', color: 'category-restaurant' },
  { value: 'retail', label: 'Retail', color: 'category-retail' },
  { value: 'manufacturing', label: 'Manufacturing', color: 'category-manufacturing' },
  { value: 'services', label: 'Services', color: 'category-services' },
] as const;