import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BUSINESS_CATEGORIES } from '@/types/business';
import { Filter, TrendingUp } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const Sidebar = ({ 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange 
}: SidebarProps) => {
  const categoryStats = [
    { category: 'tech', count: 8 },
    { category: 'restaurant', count: 6 },
    { category: 'retail', count: 7 },
    { category: 'manufacturing', count: 5 },
    { category: 'services', count: 4 },
  ];

  return (
    <aside className="w-64 space-y-4">
      {/* Quick Sort */}
      <Card className="p-4 bg-card border-border shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Sort By</h3>
        </div>
        
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-background border-input">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Business Name</SelectItem>
            <SelectItem value="location">Location</SelectItem>
            <SelectItem value="newest">Newest Listed</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Category Filters */}
      <Card className="p-4 bg-card border-border shadow-card">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Categories</h3>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>All Categories</span>
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                30
              </Badge>
            </div>
          </button>
          
          <Separator className="my-2" />
          
          {BUSINESS_CATEGORIES.map((category) => {
            const stat = categoryStats.find(s => s.category === category.value);
            const isSelected = selectedCategory === category.value;
            const categoryColor = `category-${category.value}`;
            
            return (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: `hsl(var(--${categoryColor}))` }}
                    />
                    <span>{category.label}</span>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${isSelected ? 'bg-primary-foreground text-primary' : 'bg-muted text-muted-foreground'}`}
                  >
                    {stat?.count || 0}
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Price Range */}
      <Card className="p-4 bg-card border-border shadow-card">
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Under $500K</span>
            <span>12 listings</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>$500K - $1M</span>
            <span>8 listings</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>$1M - $2M</span>
            <span>6 listings</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Over $2M</span>
            <span>4 listings</span>
          </div>
        </div>
      </Card>
    </aside>
  );
};