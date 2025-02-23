import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomMapView from './CustomMapView'; // Importo komponentin e hartës

// Mock vehicle data
const initialVehicles = [
  {
    id: 'bus1',
    name: 'Campus Shuttle A',
    route: 'Main Campus Loop',
    latitude: 37.7749,
    longitude: -122.4194,
    status: 'On Time',
  },
  {
    id: 'bus2',
    name: 'Campus Shuttle B',
    route: 'North Campus Express',
    latitude: 37.7760,
    longitude: -122.4180,
    status: 'Delayed',
  },
];

export default function TransportScreen() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [userLocation, setUserLocation] = useState(null);

  // Get user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  // Simulate vehicle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles =>
        prevVehicles.map(vehicle => ({
          ...vehicle,
          latitude: vehicle.latitude + (Math.random() * 0.001 - 0.0005),
          longitude: vehicle.longitude + (Math.random() * 0.001 - 0.0005),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Përdor komponentin CustomMapView që krijuam */}
      <CustomMapView vehicles={vehicles} />

      {/* Butoni për Refresh */}
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => setVehicles([...vehicles])}
      >
        <Text style={styles.refreshText}>🔄 Refresh</Text>
      </TouchableOpacity>

      <Text>Welcome to the Transport Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  refreshText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});