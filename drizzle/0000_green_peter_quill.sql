CREATE TABLE `venues` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`rating` real NOT NULL,
	`review_count` integer NOT NULL,
	`price_level` text NOT NULL,
	`type` text NOT NULL,
	`images` text NOT NULL,
	`tags` text NOT NULL,
	`good_reviews` text NOT NULL,
	`bad_reviews` text NOT NULL,
	`vibe_emoji` text NOT NULL
);
