import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageCarouselProps {
  images: string[];
  venueName: string;
}

export function ImageCarousel({ images, venueName }: ImageCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={16 / 9}>
              <img
                src={image}
                alt={`${venueName} interior ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}