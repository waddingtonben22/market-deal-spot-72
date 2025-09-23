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
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Business on BizTrader
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover profitable business opportunities across technology, restaurants, retail, and more.
          </p>
        </div>
      </div>
    </section>
  );
};