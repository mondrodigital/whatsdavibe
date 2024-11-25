import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'local.db');

// Delete existing database if it exists
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

const client = createClient({
  url: 'file:local.db',
});

const db = drizzle(client);

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Ensure drizzle directory exists
    const drizzleDir = path.join(__dirname, '..', 'drizzle');
    if (!fs.existsSync(drizzleDir)) {
      fs.mkdirSync(drizzleDir, { recursive: true });
    }

    await migrate(db, {
      migrationsFolder: './drizzle',
    });

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();