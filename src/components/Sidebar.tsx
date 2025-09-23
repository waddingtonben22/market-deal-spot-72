import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { BUSINESS_CATEGORIES } from '@/types/business';
import { Search, Filter, TrendingUp, MapPin, DollarSign, Users, Calendar } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onSearch: (location: string, category: string) => void;
}

export const Sidebar = ({ 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange,
  onSearch
}: SidebarProps) => {
  const [locationSearch, setLocationSearch] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [features, setFeatures] = useState({
    negotiable: false,
    established: false,
    profitable: false,
    franchiseOpportunity: false
  });

  const categoryStats = [
    { category: 'tech', count: 8 },
    { category: 'restaurant', count: 6 },
    { category: 'retail', count: 7 },
    { category: 'manufacturing', count: 5 },
    { category: 'services', count: 4 },
  ];

  const handleSearch = () => {
    onSearch(locationSearch, selectedCategory);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`;
    return `$${price}`;
  };

  return (
    <aside className="w-80 space-y-4">
      {/* Search Section */}
      <Card className="p-4 bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Search Businesses</h3>
        </div>
        
        {/* Location Search */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Enter city, state, or postcode"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>
          </div>

          {/* Category Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {BUSINESS_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </Card>

      {/* Price Range Filter */}
      <Card className="p-4 bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Price Range</h3>
        </div>
        
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000000}
            min={0}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          
          {/* Quick Price Filters */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button 
              onClick={() => setPriceRange([0, 500000])}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              Under $500K
            </button>
            <button 
              onClick={() => setPriceRange([500000, 1000000])}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              $500K - $1M
            </button>
            <button 
              onClick={() => setPriceRange([1000000, 2000000])}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              $1M - $2M
            </button>
            <button 
              onClick={() => setPriceRange([2000000, 5000000])}
              className="p-2 text-left border rounded hover:bg-gray-50"
            >
              $2M+
            </button>
          </div>
        </div>
      </Card>

      {/* Business Features */}
      <Card className="p-4 bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Business Features</h3>
        </div>
        
        <div className="space-y-3">
          {[
            { key: 'negotiable', label: 'Price Negotiable' },
            { key: 'established', label: 'Established Business' },
            { key: 'profitable', label: 'Currently Profitable' },
            { key: 'franchiseOpportunity', label: 'Franchise Opportunity' }
          ].map((feature) => (
            <div key={feature.key} className="flex items-center space-x-2">
              <Checkbox
                id={feature.key}
                checked={features[feature.key as keyof typeof features]}
                onCheckedChange={(checked) => 
                  setFeatures(prev => ({ ...prev, [feature.key]: checked }))
                }
              />
              <label htmlFor={feature.key} className="text-sm text-gray-700">
                {feature.label}
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Sort Options */}
      <Card className="p-4 bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Sort Results</h3>
        </div>
        
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Most Recent</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Business Name</SelectItem>
            <SelectItem value="location">Location</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Quick Stats */}
      <Card className="p-4 bg-white border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Market Overview</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Active Listings</span>
            <span className="font-medium">30</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg. Price</span>
            <span className="font-medium">$1.2M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">New This Week</span>
            <span className="font-medium">5</span>
          </div>
        </div>
      </Card>
    </aside>
  );
};