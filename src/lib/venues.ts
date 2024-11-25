import { fetchVenuesForLocation as fetchYelpVenues } from './yelp';
import { Venue } from '@/types/venue';

export async function fetchVenuesForLocation(
  searchQuery: string = '',
  venueType: string = 'all',
  limit: number = 6
): Promise<Venue[]> {
  try {
    const location = searchQuery || 'New York, NY';
    const venues = await fetchYelpVenues(location, limit);

    if (venueType !== 'all') {
      return venues.filter(venue => venue.type === venueType);
    }

    return venues;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
}

export async function getCurrentLocation(): Promise<{ city: string; state: string }> {
  // For demo purposes, default to New York
  return {
    city: 'New York',
    state: 'NY'
  };
}