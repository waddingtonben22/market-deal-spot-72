import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
}

const Map = ({ onLocationSelect }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: 10,
        center: [-74.006, 40.7128], // Default to NYC
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add click handler for location selection
      map.current.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        
        // Remove existing marker
        if (marker.current) {
          marker.current.remove();
        }
        
        // Add new marker
        marker.current = new mapboxgl.Marker({
          color: '#3b82f6'
        })
          .setLngLat([lng, lat])
          .addTo(map.current!);

        // Reverse geocoding to get address
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
          );
          const data = await response.json();
          const address = data.features[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          
          onLocationSelect?.({ lat, lng, address });
        } catch (error) {
          console.error('Geocoding error:', error);
          onLocationSelect?.({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
        }
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setShowTokenInput(true);
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, onLocationSelect]);

  if (showTokenInput) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center p-6 max-w-md">
          <h3 className="text-lg font-semibold mb-4">Mapbox Token Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your Mapbox public token to enable the interactive map. 
            Get yours at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
          </p>
          <input
            type="text"
            placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md text-sm"
          />
          <button
            onClick={() => setMapboxToken(mapboxToken)}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm rounded-md px-3 py-2 text-sm text-foreground shadow-sm">
        Click on the map to select a search area
      </div>
    </div>
  );
};

export default Map;