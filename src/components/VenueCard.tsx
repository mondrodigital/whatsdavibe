import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Building2, 
  MapPin, 
  Star,
  ThumbsUp, 
  ThumbsDown,
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ImageCarousel } from '@/components/ImageCarousel';
import { Venue } from '@/types/venue';

interface VenueCardProps {
  venue: Venue;
  onSelect: () => void;
  isSelected: boolean;
}

export function VenueCard({ venue, onSelect, isSelected }: VenueCardProps) {
  return (
    <Card 
      className={`
        isometric-card overflow-hidden group cursor-pointer bg-white 
        border-2 shadow-[4px_4px_0_0_hsl(var(--navy))] 
        hover:shadow-[6px_6px_0_0_hsl(var(--navy))] transition-all
        ${isSelected ? 'ring-2 ring-[hsl(var(--coral))]' : ''}
      `}
      onClick={onSelect}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <AspectRatio ratio={16 / 9}>
              <img
                src={venue.images[0]}
                alt={venue.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{venue.rating.toFixed(1)}</span>
              </div>
            </AspectRatio>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold tracking-tight">{venue.name}</h3>
                <span className="text-2xl">{venue.vibeEmoji}</span>
              </div>
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 mr-1 text-[hsl(var(--coral))]" />
                <span className="text-sm truncate">{venue.address}</span>
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {venue.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="bg-[hsl(var(--sky))] text-[hsl(var(--navy))] hover:bg-[hsl(var(--sky))]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{venue.priceLevel}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[hsl(var(--coral))] hover:text-[hsl(var(--navy))] hover:bg-[hsl(var(--sky))]"
                >
                  <span className="mr-2">View More</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl bg-white p-6">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[hsl(var(--coral))]" />
                  {venue.name}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {venue.address}, {venue.city}, {venue.state}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="text-3xl block mb-1">{venue.vibeEmoji}</span>
                  <span className="text-sm text-muted-foreground">{venue.type}</span>
                </div>
                <div className="text-center">
                  <span className="text-3xl block mb-1">{venue.priceLevel}</span>
                  <span className="text-sm text-muted-foreground">price level</span>
                </div>
              </div>
            </div>
            
            <ImageCarousel images={venue.images} venueName={venue.name} />
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[hsl(var(--sky))/0.1] p-4 rounded-lg">
                <h3 className="flex items-center gap-2 font-bold mb-3 text-[hsl(var(--coral))]">
                  <ThumbsUp className="w-4 h-4" />
                  Good Vibes
                </h3>
                <ul className="space-y-2">
                  {venue.goodReviews.map((review, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-[hsl(var(--navy))]">•</span>
                      {review}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[hsl(var(--coral))/0.1] p-4 rounded-lg">
                <h3 className="flex items-center gap-2 font-bold mb-3 text-[hsl(var(--navy))]">
                  <ThumbsDown className="w-4 h-4" />
                  Bad Vibes
                </h3>
                <ul className="space-y-2">
                  {venue.badReviews.map((review, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-[hsl(var(--navy))]">•</span>
                      {review}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}