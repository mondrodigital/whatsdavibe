import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const venues = sqliteTable('venues', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  rating: real('rating').notNull(),
  reviewCount: integer('review_count').notNull(),
  priceLevel: text('price_level', { enum: ['💰', '💰💰', '💰💰💰'] }).notNull(),
  type: text('type', { enum: ['coffee', 'restaurant'] }).notNull(),
  images: text('images').notNull(), // JSON string array
  tags: text('tags').notNull(), // JSON string array
  goodReviews: text('good_reviews').notNull(), // JSON string array
  badReviews: text('bad_reviews').notNull(), // JSON string array
  vibeEmoji: text('vibe_emoji').notNull(),
});