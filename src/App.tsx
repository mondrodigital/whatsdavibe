import { useState, useEffect } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { VenueCard } from '@/components/VenueCard';
import { VenueMap } from '@/components/VenueMap';
import { fetchVenuesForLocation, getCurrentLocation } from '@/lib/venues';
import { Venue } from '@/types/venue';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [venueType, setVenueType] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const { toast } = useToast();

  // Get user's location on mount
  useEffect(() => {
    async function getLocation() {
      try {
        const userLocation = await getCurrentLocation();
        setLocation(`${userLocation.city}, ${userLocation.state}`);
        toast({
          title: "Location detected",
          description: `Showing venues in ${userLocation.city}, ${userLocation.state}`,
        });
      } catch (error) {
        console.error('Error getting location:', error);
        setLocation('New York, NY'); // Default location
      }
    }

    getLocation();
  }, [toast]);

  // Fetch venues when location, search, or filters change
  useEffect(() => {
    let mounted = true;

    async function loadVenues() {
      if (!location) return;

      try {
        setLoading(true);
        setError(null);
        const searchLocation = searchQuery || location;
        const data = await fetchVenuesForLocation(searchLocation, venueType);
        
        if (mounted && data.length > 0) {
          setVenues(data);
          toast({
            title: "Venues loaded",
            description: `Found ${data.length} venues in ${searchLocation}`,
          });
        } else if (mounted) {
          setError('No venues found matching your criteria');
          toast({
            title: "No venues found",
            description: "Try adjusting your search or filters",
            variant: "destructive",
          });
        }
      } catch (err) {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load venues';
          setError(errorMessage);
          toast({
            title: "Error loading venues",
            description: errorMessage,
            variant: "destructive",
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadVenues();

    return () => {
      mounted = false;
    };
  }, [location, searchQuery, venueType, toast]);

  const filteredVenues = venues.filter(venue => {
    const matchesFilter = activeFilter === '' || 
      venue.tags.some(tag => tag === activeFilter);
    return matchesFilter;
  });

  if (!location) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Detecting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader 
        onSearch={setSearchQuery} 
        onFilterChange={setActiveFilter}
        onVenueTypeChange={setVenueType}
        activeFilter={activeFilter}
        activeVenueType={venueType}
        isLoading={loading}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Loading venues...</h3>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">❌</span>
                <h3 className="text-xl font-semibold mb-2">Oops! Something went wrong</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
            ) : filteredVenues.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold mb-2">No venues found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVenues.map((venue) => (
                  <VenueCard 
                    key={venue.id} 
                    venue={venue} 
                    onSelect={() => setSelectedVenue(venue.id)}
                    isSelected={venue.id === selectedVenue}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-1 h-[calc(100vh-12rem)] sticky top-24">
            <VenueMap 
              venues={filteredVenues} 
              selectedVenue={filteredVenues.find(v => v.id === selectedVenue)} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}