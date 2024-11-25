export interface VenueSubmission {
  // Basic Info
  name: string;
  address: string;
  website?: string;
  phone?: string;
  
  // Location
  neighborhood: string;
  coordinates?: [number, number];
  
  // Characteristics
  type: 'coffee' | 'restaurant';
  priceLevel: '💰' | '💰💰' | '💰💰💰';
  vibeEmoji: string;
  tags: string[];
  
  // Media
  images: {
    file: File;
    description: string;
    credit: string;
  }[];
  
  // Reviews & Impressions
  goodVibes: string[];
  badVibes: string[];
  
  // Submission Meta
  submitterName: string;
  submitterEmail: string;
  permissionGranted: boolean;
  dateVisited: string;
}