import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CustomMapView = ({ vehicles }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    const map = L.map(mapContainer.current).setView([37.7749, -122.4194], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    vehicles.forEach(vehicle => {
      const marker = L.marker([vehicle.latitude, vehicle.longitude]).addTo(map);
      marker.bindPopup(`${vehicle.name}<br/>Route: ${vehicle.route}<br/>Status: ${vehicle.status}`);
    });

    return () => map.remove();
  }, [vehicles]);

  return <div ref={mapContainer} style={{ height: '100vh', width: '100%' }} />;
};

export default CustomMapView;
