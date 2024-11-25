import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create necessary directories
const dataDir = path.join(__dirname, '..', 'data');
const kaggleDir = path.join(os.homedir(), '.kaggle');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(kaggleDir)) {
  fs.mkdirSync(kaggleDir, { recursive: true });
}

// Create kaggle.json with credentials
const kaggleConfig = {
  "username": "mondrodigital",
  "key": "01e35d95b826cb6f44066439bf0849e5"
};

// Write kaggle.json
fs.writeFileSync(
  path.join(kaggleDir, 'kaggle.json'),
  JSON.stringify(kaggleConfig, null, 2),
  'utf-8'
);

// Set correct permissions for kaggle.json
fs.chmodSync(path.join(kaggleDir, 'kaggle.json'), 0o600);

try {
  console.log('Installing Kaggle CLI...');
  execSync('pip install --user kaggle', { stdio: 'inherit' });

  console.log('Downloading Yelp dataset...');
  execSync('kaggle datasets download shekhartiruwa25/yelp-data -p data --unzip', { stdio: 'inherit' });
  
  console.log('Dataset downloaded successfully!');
} catch (error) {
  console.error('Error downloading dataset:', error);
  console.log('Falling back to sample data generation...');
  
  // Generate sample data as fallback
  function generateSampleData() {
    const sampleBusinesses = Array.from({ length: 50 }, (_, i) => ({
      business_id: `sample${i + 1}`,
      name: `Sample Venue ${i + 1}`,
      address: `${100 + i} Main St`,
      city: ['San Francisco', 'New York', 'Los Angeles', 'Chicago'][i % 4],
      state: ['CA', 'NY', 'CA', 'IL'][i % 4],
      latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
      longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
      stars: 3 + Math.random() * 2,
      review_count: Math.floor(Math.random() * 500),
      categories: Math.random() > 0.5 ? 'Coffee, Cafe' : 'Restaurant, Food',
      attributes: {
        WiFi: Math.random() > 0.5 ? 'free' : 'no',
        NoiseLevel: ['quiet', 'average', 'loud'][Math.floor(Math.random() * 3)],
        GoodForGroups: Math.random() > 0.5,
        Ambience: {
          romantic: Math.random() > 0.5,
          intimate: Math.random() > 0.5
        }
      }
    }));

    return sampleBusinesses;
  }

  const sampleData = generateSampleData();
  fs.writeFileSync(
    path.join(dataDir, 'yelp_academic_dataset_business.json'),
    sampleData.map(business => JSON.stringify(business)).join('\n'),
    'utf-8'
  );
  
  console.log('Sample data has been generated as fallback.');
}</content>