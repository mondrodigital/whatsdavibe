import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import fs from 'fs/promises';
import path from 'path';

const client = createClient({
  url: 'file:local.db',
});

const db = drizzle(client);

// Helper function to determine venue type
function determineVenueType(categories) {
  return categories.toLowerCase().includes('coffee') ? 'coffee' : 'restaurant';
}

// Helper function to determine vibe emoji
function determineVibeEmoji(categories, rating) {
  if (categories.toLowerCase().includes('coffee')) return '☕️';
  if (rating >= 4.5) return '⭐️';
  if (categories.toLowerCase().includes('bar')) return '🍸';
  return '🍽️';
}

// Helper function to generate tags
function generateTags(business) {
  const tags = [];
  
  if (business.attributes?.WiFi === 'free') {
    tags.push('💻 Work Friendly');
  }
  
  if (business.attributes?.NoiseLevel === 'quiet') {
    tags.push('📚 Study Spot');
  }
  
  if (business.attributes?.Ambience?.romantic === true) {
    tags.push('💑 Date Spot');
  }
  
  if (business.attributes?.GoodForGroups === true) {
    tags.push('👥 Group Friendly');
  }
  
  // Add some default tags based on rating and review count
  if (business.stars >= 4.5) {
    tags.push('⭐️ Highly Rated');
  }
  
  if (business.review_count > 100) {
    tags.push('📸 Popular Spot');
  }
  
  return tags;
}

async function seedDatabase() {
  try {
    console.log('Reading Yelp dataset...');
    const data = await fs.readFile(path.join(process.cwd(), 'data', 'yelp_academic_dataset_business.json'), 'utf-8');
    const businesses = data.trim().split('\n').map(line => JSON.parse(line));
    
    console.log('Processing businesses...');
    const venues = businesses
      .filter(b => b.categories && (b.categories.toLowerCase().includes('restaurant') || b.categories.toLowerCase().includes('coffee')))
      .map(business => ({
        id: business.business_id,
        name: business.name,
        address: business.address,
        city: business.city,
        state: business.state,
        latitude: business.latitude,
        longitude: business.longitude,
        rating: business.stars,
        reviewCount: business.review_count,
        priceLevel: '💰'.repeat(business.attributes?.RestaurantsPriceRange2 || 1),
        type: determineVenueType(business.categories),
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
          'https://images.unsplash.com/photo-1559925393-8be0ec4767c8',
          'https://images.unsplash.com/photo-1521017432531-fbd92d768814'
        ]),
        tags: JSON.stringify(generateTags(business)),
        goodReviews: JSON.stringify([
          'Great atmosphere and service!',
          `Rated ${business.stars}/5 by ${business.review_count} people`
        ]),
        badReviews: JSON.stringify([
          'Can get busy during peak hours'
        ]),
        vibeEmoji: determineVibeEmoji(business.categories, business.stars)
      }));

    console.log('Creating database schema...');
    await migrate(db, {
      migrationsFolder: './drizzle',
    });

    console.log('Inserting venues...');
    for (let i = 0; i < venues.length; i += 100) {
      const batch = venues.slice(i, i + 100);
      await db.insert(venues).values(batch);
      console.log(`Inserted ${i + batch.length} venues...`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();