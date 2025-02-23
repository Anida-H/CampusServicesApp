import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importo stilet e leaflet
import { View, Dimensions } from 'react-native';

// Krijo komponentin e hartës
const CustomMapView = ({ vehicles }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    // Krijo hartën kur komponenti ngarkohet
    const map = L.map(mapContainer.current).setView([37.7749, -122.4194], 13); // Lat & Long për qytetin

    // Shto një map layer (Google, OpenStreetMap, etj.)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Shto marker për çdo automjet duke përdorur imazhin e automjetit
    vehicles.forEach(vehicle => {
      // Përdorim imazhin e automjetit si ikona
      const busIcon = L.icon({
        iconUrl: require('../assets/bus-icon.png'),  // Përdorim rrugën relative në krahasim me CustomMapView.js
        iconSize: [30, 30], // Përshtatni madhësinë sipas nevojës
        iconAnchor: [15, 30], // Pikë e ankrimit për të mbajtur ikonen në vendin e saktë
        popupAnchor: [0, -30], // Vendos popup mbi ikonen
      });
      
      const marker = L.marker([vehicle.latitude, vehicle.longitude], { icon: busIcon }).addTo(map);

      // Lidh popup-in për markerin
      marker.bindPopup(<div style="text-align: center;">
                          ${vehicle.name}<br/>
                          Route: ${vehicle.route}<br/>
                          Status: ${vehicle.status}
                        </div>);
    });

    return () => {
      map.remove();
    };
  }, [vehicles]);

  return (
    <View style={{ height: Dimensions.get('window').height, width: '100%' }}>
      <div ref={mapContainer} style={{ height: '100%' }} />
    </View>
  );
};

export default CustomMapView;