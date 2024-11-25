import { Venue } from '@/types/venue';

const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;
const YELP_API_ENDPOINT = 'https://api.yelp.com/v3/businesses/search';

async function fetchYelpData(location: string, limit: number) {
  const params = new URLSearchParams({
    location,
    limit: limit.toString(),
    term: 'restaurants,coffee',
    sort_by: 'rating'
  });

  const response = await fetch(`${YELP_API_ENDPOINT}?${params}`, {
    headers: {
      'Authorization': `Bearer ${YELP_API_KEY}`,
      'Accept': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Yelp API');
  }

  return response.json();
}

function getPriceLevel(yelpPrice?: string): '💰' | '💰💰' | '💰💰💰' {
  const priceMap: Record<string, '💰' | '💰💰' | '💰💰💰'> = {
    '$': '💰',
    '$$': '💰💰',
    '$$$': '💰💰💰',
  };
  return priceMap[yelpPrice || '$'] || '💰';
}

function getVibeEmoji(categories: Array<{ title: string }>): string {
  if (categories.some(c => c.title.toLowerCase().includes('coffee'))) {
    return '☕️';
  }
  return '🍽️';
}

function getTags(business: any): string[] {
  const tags: string[] = [];
  
  if (business.categories?.some((c: any) => c.title.toLowerCase().includes('coffee'))) {
    tags.push('☕️ Coffee Spot');
  }

  if (business.rating >= 4.5) {
    tags.push('⭐️ Highly Rated');
  }

  if (business.review_count > 100) {
    tags.push('👥 Popular Spot');
  }

  tags.push('📸 Instagrammable');
  
  if (business.rating >= 4) {
    tags.push('💻 Work Friendly');
  }

  return tags.slice(0, 4);
}

export async function fetchVenuesForLocation(
  location: string = 'New York, NY',
  limit: number = 6
): Promise<Venue[]> {
  try {
    const data = await fetchYelpData(location, limit);
    const businesses = data.businesses;

    if (!businesses?.length) {
      throw new Error(`No venues found in ${location}`);
    }

    return businesses.map((business: any) => ({
      id: business.id,
      name: business.name,
      address: `${business.location.address1}`,
      city: business.location.city,
      state: business.location.state,
      coordinates: [
        business.coordinates.latitude,
        business.coordinates.longitude
      ],
      latitude: business.coordinates.latitude,
      longitude: business.coordinates.longitude,
      rating: business.rating,
      reviewCount: business.review_count,
      images: business.image_url ? [
        business.image_url,
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80'
      ] : [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80'
      ],
      vibeEmoji: getVibeEmoji(business.categories),
      priceLevel: getPriceLevel(business.price),
      type: business.categories.some((c: any) => 
        c.title.toLowerCase().includes('coffee')) ? 'coffee' : 'restaurant',
      tags: getTags(business),
      goodReviews: [
        `Rated ${business.rating}/5 by ${business.review_count} people`,
        'Great atmosphere and service!'
      ],
      badReviews: [
        'Can get busy during peak hours'
      ],
    }));

  } catch (error) {
    console.error('Error fetching venues:', error);
    throw new Error('Failed to fetch venues. Please check your API key and try again.');
  }
}