import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Sidebar } from '@/components/Sidebar';
import { BusinessCard } from '@/components/BusinessCard';
import { AdCard } from '@/components/AdCard';
import { BusinessModal } from '@/components/BusinessModal';
import { sampleBusinesses } from '@/data/sampleBusinesses';
import { Business } from '@/types/business';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');

  // Filter and sort businesses
  const filteredAndSortedBusinesses = useMemo(() => {
    let filtered = sampleBusinesses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter(business =>
        business.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    // Sort businesses
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'location':
          return a.location.localeCompare(b.location);
        case 'newest':
        default:
          return b.id - a.id; // Assuming higher ID = newer
      }
    });

    return sorted;
  }, [searchTerm, selectedCategory, sortBy, locationFilter]);

  // Handle hero search
  const handleHeroSearch = (location: string, category: string) => {
    setLocationFilter(location);
    setSelectedCategory(category);
  };

  // Create grid with ads
  const gridItems = useMemo(() => {
    const items: (Business | { isAd: true; id: string })[] = [];
    
    filteredAndSortedBusinesses.forEach((business, index) => {
      // Add business
      items.push(business);
      
      // Add ad every 5th position (after positions 4, 9, 14, etc.)
      if ((index + 1) % 5 === 0 && index < filteredAndSortedBusinesses.length - 1) {
        items.push({ isAd: true, id: `ad-${index}` });
      }
    });
    
    return items;
  }, [filteredAndSortedBusinesses]);

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBusiness(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        onSearch={handleHeroSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content */}
      <div className="w-full px-8 py-6 bg-gray-50">
        <div className="flex gap-6 max-w-none">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block shrink-0 sticky top-24 h-fit">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onSearch={handleHeroSearch}
            />
          </div>

          {/* Main Grid */}
          <div className="flex-1">

            {/* Grid - Facebook Marketplace style */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              {gridItems.map((item) => {
                if ('isAd' in item) {
                  return <AdCard key={item.id} />;
                }
                
                return (
                  <BusinessCard
                    key={item.id}
                    business={item}
                    onClick={() => handleBusinessClick(item)}
                  />
                );
              })}
            </div>

            {/* No results */}
            {filteredAndSortedBusinesses.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No businesses found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or browse all categories.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Business Modal */}
      <BusinessModal
        business={selectedBusiness}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
