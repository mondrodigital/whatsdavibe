import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { VENUES } from '@/data/venues';
import { venues } from './schema';

const client = createClient({
  url: 'file:local.db',
});

export const db = drizzle(client, { schema });

// Initialize database with sample data if needed
export async function initializeDb() {
  try {
    // Check if venues table exists and has data
    const result = await db.select().from(venues).limit(1);
    
    if (result.length === 0) {
      // Insert sample data if table is empty
      const venuesData = VENUES.map(venue => ({
        id: venue.id,
        name: venue.name,
        address: venue.address,
        city: 'New York', // Default city
        state: 'NY', // Default state
        latitude: venue.coordinates[0],
        longitude: venue.coordinates[1],
        rating: venue.rating,
        reviewCount: 100, // Default review count
        priceLevel: venue.priceLevel,
        type: venue.type,
        images: JSON.stringify(venue.images),
        tags: JSON.stringify(venue.tags),
        goodReviews: JSON.stringify(venue.goodReviews),
        badReviews: JSON.stringify(venue.badReviews),
        vibeEmoji: venue.vibeEmoji
      }));

      await db.insert(venues).values(venuesData);
      console.log('Sample data inserted successfully');
    }

    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('no such table')) {
      // Create table and insert sample data
      await db.run(`
        CREATE TABLE IF NOT EXISTS venues (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          city TEXT NOT NULL,
          state TEXT NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          rating REAL NOT NULL,
          review_count INTEGER NOT NULL,
          price_level TEXT NOT NULL,
          type TEXT NOT NULL,
          images TEXT NOT NULL,
          tags TEXT NOT NULL,
          good_reviews TEXT NOT NULL,
          bad_reviews TEXT NOT NULL,
          vibe_emoji TEXT NOT NULL
        )
      `);

      // Insert sample data
      const venuesData = VENUES.map(venue => ({
        id: venue.id,
        name: venue.name,
        address: venue.address,
        city: 'New York',
        state: 'NY',
        latitude: venue.coordinates[0],
        longitude: venue.coordinates[1],
        rating: venue.rating,
        reviewCount: 100,
        priceLevel: venue.priceLevel,
        type: venue.type,
        images: JSON.stringify(venue.images),
        tags: JSON.stringify(venue.tags),
        goodReviews: JSON.stringify(venue.goodReviews),
        badReviews: JSON.stringify(venue.badReviews),
        vibeEmoji: venue.vibeEmoji
      }));

      await db.insert(venues).values(venuesData);
      console.log('Database initialized with sample data');
      return true;
    }
    
    console.error('Database initialization error:', error);
    return false;
  }
}