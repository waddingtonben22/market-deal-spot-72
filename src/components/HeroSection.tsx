import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Filter } from 'lucide-react';
import Map from '@/components/Map';
import { BUSINESS_CATEGORIES } from '@/types/business';

interface HeroSectionProps {
  onSearch: (location: string, category: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const HeroSection = ({ onSearch, selectedCategory, onCategoryChange }: HeroSectionProps) => {
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number; address: string} | null>(null);

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setSelectedLocation(location);
    setLocationSearch(location.address);
  };

  const handleSearch = () => {
    onSearch(locationSearch, selectedCategory);
  };

  return (
    <section className="w-full bg-gradient-hero border-b border-border">
      <div className="w-full px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Business on BizTrader
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover profitable business opportunities across technology, restaurants, retail, and more. 
            Use our interactive map to explore listings in your area.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Search Controls */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 shadow-card">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-white" />
                Search Businesses
              </h3>
              
              <div className="space-y-4">
                {/* Location Search */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Enter city, state, or zip code"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="pl-10 bg-white/20 border-white/30 focus:ring-white/50 text-white placeholder:text-white/70"
                    />
                  </div>
                  {selectedLocation && (
                    <p className="text-xs text-white/70 mt-1">
                      Selected: {selectedLocation.address}
                    </p>
                  )}
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Business Category
                  </label>
                  <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="all">All Categories</SelectItem>
                      {BUSINESS_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-white hover:bg-white/90 text-blue-900 transition-colors"
                  size="lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Businesses
                </Button>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-white/70">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$2.5M</div>
                <div className="text-sm text-white/70">Avg. Sale Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm text-white/70">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20 shadow-card">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white" />
              Interactive Search Area
            </h3>
            <div className="h-96 rounded-lg overflow-hidden">
              <Map onLocationSelect={handleLocationSelect} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};