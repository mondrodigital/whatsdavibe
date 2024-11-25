export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  coordinates: [number, number];
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  images: string[];
  vibeEmoji: string;
  priceLevel: '💰' | '💰💰' | '💰💰💰';
  type: 'coffee' | 'restaurant';
  tags: string[];
  goodReviews: string[];
  badReviews: string[];
}