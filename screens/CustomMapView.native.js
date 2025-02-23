import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Dimensions, StyleSheet } from 'react-native';

const CustomMapView = ({ vehicles }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            coordinate={{
              latitude: vehicle.latitude,
              longitude: vehicle.longitude,
            }}
            title={vehicle.name}
            description={`Route: ${vehicle.route} | Status: ${vehicle.status}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CustomMapView;
