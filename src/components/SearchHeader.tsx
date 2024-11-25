import { Search, Coffee, UtensilsCrossed, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface SearchHeaderProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onVenueTypeChange: (type: string) => void;
  activeFilter: string;
  activeVenueType: string;
  isLoading?: boolean;
}

export function SearchHeader({ 
  onSearch, 
  onFilterChange, 
  onVenueTypeChange,
  activeFilter,
  activeVenueType,
  isLoading = false
}: SearchHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b-2 border-[hsl(var(--navy))]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-black tracking-tight">
            what<span className="text-[hsl(var(--coral))]">da</span>vibe
            <span className="ml-2">✨</span>
          </h1>
          <ToggleGroup 
            type="single" 
            value={activeVenueType}
            onValueChange={(value) => value && onVenueTypeChange(value)}
            className="border-2 border-[hsl(var(--navy))] rounded-lg overflow-hidden"
          >
            <ToggleGroupItem 
              value="all" 
              aria-label="All venues"
              className="data-[state=on]:bg-[hsl(var(--sky))] data-[state=on]:text-[hsl(var(--navy))]"
            >
              <span className="text-xl">🏠</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="coffee" 
              aria-label="Coffee shops"
              className="data-[state=on]:bg-[hsl(var(--sky))] data-[state=on]:text-[hsl(var(--navy))]"
            >
              <Coffee className="w-5 h-5" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="restaurant" 
              aria-label="Restaurants"
              className="data-[state=on]:bg-[hsl(var(--sky))] data-[state=on]:text-[hsl(var(--navy))]"
            >
              <UtensilsCrossed className="w-5 h-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--coral))] w-5 h-5" />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin" />
          )}
          <Input
            className="pl-10 pr-4 border-2 border-[hsl(var(--navy))] h-12 text-lg"
            placeholder="Search by vibe, location, or name..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['🌿 Plant Vibes', '📚 Study Spot', '💻 Work Friendly', '📸 Instagrammable', '🎵 Good Music', '🪑 Comfy Seats'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(activeFilter === filter ? '' : filter)}
              className={`whitespace-nowrap border-2 border-[hsl(var(--navy))] ${
                activeFilter === filter 
                  ? "bg-[hsl(var(--sky))] text-[hsl(var(--navy))] hover:bg-[hsl(var(--sky))]" 
                  : "hover:bg-[hsl(var(--sky))] hover:text-[hsl(var(--navy))]"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}