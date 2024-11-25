import { Venue } from '@/types/venue';

export const VENUES: Venue[] = [
  {
    id: '1',
    name: 'The Coffee House',
    address: '123 Cozy Street, Downtown',
    coordinates: [40.7128, -74.0060],
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534073737927-85f1c416d3ba?auto=format&fit=crop&w=1200&q=80',
    ],
    vibeEmoji: '☕️',
    rating: 4.5,
    priceLevel: '💰',
    type: 'coffee',
    tags: ['📚 Study Spot', '💻 Work Friendly', '🌅 Good Lighting'],
    goodReviews: [
      'Amazing natural light throughout the day',
      'Perfect spot for remote work',
      'Best coffee in town',
    ],
    badReviews: [
      'Can get crowded during peak hours',
      'Limited parking options',
    ],
  },
  {
    id: '2',
    name: 'Green Corner Bistro',
    address: '456 Garden Avenue',
    coordinates: [40.7112, -74.0055],
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
    ],
    vibeEmoji: '🌿',
    rating: 4.8,
    priceLevel: '💰💰',
    type: 'restaurant',
    tags: ['🌿 Plant Vibes', '📸 Instagrammable', '🎵 Good Music'],
    goodReviews: [
      'Beautiful plant-filled interior',
      'Excellent brunch menu',
      'Friendly staff',
    ],
    badReviews: [
      'Weekend wait times can be long',
      'Slightly pricey',
    ],
  },
  {
    id: '3',
    name: 'Urban Study Café',
    address: '789 Library Lane',
    coordinates: [40.7135, -74.0070],
    images: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534073737927-85f1c416d3ba?auto=format&fit=crop&w=1200&q=80',
    ],
    vibeEmoji: '📚',
    rating: 4.6,
    priceLevel: '💰',
    type: 'coffee',
    tags: ['📚 Study Spot', '🪑 Comfy Seats', '💻 Work Friendly'],
    goodReviews: [
      'Perfect study atmosphere',
      'Fast Wi-Fi',
      'Great lighting for reading',
    ],
    badReviews: [
      'Limited power outlets',
      'Closes early',
    ],
  },
  {
    id: '4',
    name: 'The Aesthetic Kitchen',
    address: '321 Photo Street',
    coordinates: [40.7140, -74.0065],
    images: [
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484659619207-9165d119dafe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1200&q=80',
    ],
    vibeEmoji: '📸',
    rating: 4.7,
    priceLevel: '💰💰💰',
    type: 'restaurant',
    tags: ['📸 Instagrammable', '🎨 Artsy', '🌅 Good Lighting'],
    goodReviews: [
      'Stunning interior design',
      'Perfect lighting for photos',
      'Innovative menu presentation',
    ],
    badReviews: [
      'More style than substance',
      'Expensive for portion sizes',
    ],
  },
  {
    id: '5',
    name: 'Vinyl & Brew',
    address: '567 Music Avenue',
    coordinates: [40.7145, -74.0075],
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534073737927-85f1c416d3ba?auto=format&fit=crop&w=1200&q=80',
    ],
    vibeEmoji: '🎵',
    rating: 4.9,
    priceLevel: '💰💰',
    type: 'coffee',
    tags: ['🎵 Good Music', '🎨 Artsy', '🪑 Comfy Seats'],
    goodReviews: [
      'Amazing vinyl collection',
      'Great coffee and atmosphere',
      'Regular live music events',
    ],
    badReviews: [
      'Can get noisy during events',
      'Limited food options',
    ],
  },
  {
    id: '6',
    name: 'The Artist\'s Table',
    address: '890 Gallery Row',
    coordinates: [40.7150, -74.0080],
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    ],
    vibeEmoji: '🎨',
    rating: 4.7,
    priceLevel: '💰💰',
    type: 'restaurant',
    tags: ['🎨 Artsy', '📸 Instagrammable', '🌿 Plant Vibes'],
    goodReviews: [
      'Local art exhibitions',
      'Creative plating',
      'Unique atmosphere',
    ],
    badReviews: [
      'Reservations required',
      'Menu changes frequently',
    ],
  },
];