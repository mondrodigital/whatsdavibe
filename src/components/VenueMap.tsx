import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Venue } from '@/types/venue';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VenueMapProps {
  venues: Venue[];
  selectedVenue?: Venue;
}

export function VenueMap({ venues, selectedVenue }: VenueMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const center = selectedVenue?.coordinates || [40.7128, -74.0060];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
      if (selectedVenue) {
        mapRef.current.setView(selectedVenue.coordinates, 15);
      }
    }
  }, [selectedVenue]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border bg-white">
      <MapContainer
        center={center as [number, number]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={venue.coordinates}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{venue.name}</h3>
                <p className="text-sm text-muted-foreground">{venue.address}</p>
                <div className="mt-2">
                  <span className="text-xl">{venue.vibeEmoji}</span>
                  <span className="ml-2">{venue.priceLevel}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}