// Fetch activity data from /api/activities/recent
// Initialise mapbox map
// Draw recent activity routes on the map

'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function ActivityGlobe() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [activities, setActivities] = useState<any[]>([]);

  // Fetch activities
  useEffect(() => {
    fetch('/api/activities/recent')
      .then(res => res.json())
      .then(data => {
        console.log('✅ Loaded', data.length, 'activities');
        setActivities(data);
      });
  }, []);

  // Initialize map when container exists
  useEffect(() => {
    if (!mapContainer.current) {
      console.log('⏳ Waiting for container...');
      return;
    }

    console.log('🗺️ Container exists! Initializing map...');

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-1.3080, 51.0632],
      zoom: 12,
    });

    map.on('load', () => {
      console.log('✅ Map loaded successfully!');
      
      // Draw first activity if available
      if (activities.length > 0 && activities[0].polyline) {
        const coords = decodePolyline(activities[0].polyline);
        console.log('📍 Decoded', coords.length, 'points');
        
        if (coords.length > 0) {
          map.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: coords.map(c => [c[1], c[0]]),
              },
            },
          });

          map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            paint: {
              'line-color': '#00ff87',
              'line-width': 4,
            },
          });

          map.flyTo({
            center: [coords[0][1], coords[0][0]],
            zoom: 13,
          });
        }
      }
    });

    return () => map.remove();
  }, [activities]);

  return (
    <div>
      <p className="text-white mb-4">Activities: {activities.length}</p>
      <div 
        ref={mapContainer} 
        className="h-[500px] w-full rounded-lg"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
}

function decodePolyline(encoded: string): number[][] {
  const coords: number[][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coords.push([lat / 1e5, lng / 1e5]);
  }

  return coords;
}