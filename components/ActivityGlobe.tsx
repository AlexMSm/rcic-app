'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getRecentActivitiesForGlobe, mockUsers } from '@/lib/mock-data';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function ActivityGlobe() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const activities = getRecentActivitiesForGlobe();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: 'globe',
      center: [-1.3080, 51.0632], // Winchester
      zoom: 11,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Configure globe
    map.current.on('style.load', () => {
      if (map.current) {
        map.current.setFog({
          color: 'rgb(10, 14, 26)',
          'high-color': 'rgb(26, 31, 46)',
          'horizon-blend': 0.02,
        });
      }
    });

  }, []);

useEffect(() => {
  if (!map.current || activities.length === 0) return;

  const updateActivity = () => {
    const activity = activities[currentIndex];
    const user = mockUsers.find(u => u.id === activity.user_id);
    
    if (!user) return;

    const coords = JSON.parse(activity.polyline);
    
    // Clear existing markers
    const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
    while (existingMarkers.length > 0) {
      existingMarkers[0].remove();
    }

    // Remove existing route if it exists
    if (map.current!.getSource('route')) {
      map.current!.removeLayer('route');
      map.current!.removeSource('route');
    }

    // Check if style is loaded before adding source
    if (!map.current!.isStyleLoaded()) {
      // Wait for style to load, then try again
      map.current!.once('idle', updateActivity);
      return;
    }

    // Add route line
    map.current!.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coords.map((c: number[]) => [c[1], c[0]]),
        },
      },
    });

    map.current!.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#00ff87',
        'line-width': 4,
        'line-opacity': 0.8,
      },
    });

    // Add marker with user avatar
    const el = document.createElement('div');
    el.className = 'activity-marker';
    el.style.backgroundImage = `url(${user.profile_image_url})`;
    el.style.width = '50px';
    el.style.height = '50px';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid #00ff87';
    el.style.backgroundSize = 'cover';
    el.style.cursor = 'pointer';
    el.style.boxShadow = '0 0 20px rgba(0, 255, 135, 0.5)';

    const startCoord = coords[0];
    new mapboxgl.Marker(el)
      .setLngLat([startCoord[1], startCoord[0]])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div style="color: #0a0e1a; padding: 4px;">
              <strong>${user.name}</strong><br/>
              ${activity.name}<br/>
              ${(activity.distance / 1000).toFixed(1)} km
            </div>
          `)
      )
      .addTo(map.current!);

    // Fly to route
    map.current!.flyTo({
      center: [startCoord[1], startCoord[0]],
      zoom: 13,
      duration: 2000,
      essential: true,
    });
  };

  updateActivity();

}, [currentIndex, activities]);

  // Auto-cycle through activities
  useEffect(() => {
    if (activities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [activities.length]);

  if (activities.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-[#0a0e1a] rounded-lg">
        <p className="text-gray-400">No recent activities to display</p>
      </div>
    );
  }

  const currentActivity = activities[currentIndex];
  const currentUser = mockUsers.find(u => u.id === currentActivity.user_id);

  return (
    <div className="relative">
      <div ref={mapContainer} className="h-[500px] rounded-lg overflow-hidden" />
      
      {/* Activity info overlay */}
      <div className="absolute top-4 left-4 bg-[#0a0e1a]/90 backdrop-blur-sm p-4 rounded-lg border border-gray-800 max-w-xs">
        <div className="flex items-center gap-3 mb-2">
          <img 
            src={currentUser?.profile_image_url} 
            alt={currentUser?.name}
            className="w-10 h-10 rounded-full border-2 border-[#00ff87]"
          />
          <div>
            <p className="text-white font-semibold">{currentUser?.name}</p>
            <p className="text-gray-400 text-sm">{currentActivity.type}</p>
          </div>
        </div>
        <p className="text-white font-semibold mb-1">{currentActivity.name}</p>
        <p className="text-[#00ff87] text-sm">
          {(currentActivity.distance / 1000).toFixed(1)} km
        </p>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {activities.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex ? 'bg-[#00ff87] w-6' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}