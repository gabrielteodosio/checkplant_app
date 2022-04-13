import React, { useEffect, useState, useRef } from 'react'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import {
  Text,
  View,
  Platform,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native'

import { Colors } from '../../theme/colors'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({ navigation }) => {
  const mapRef = useRef()

  const [markers, setMarkers] = useState([])
  const [mapRegion, setMapRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })

  useEffect(() => {
    if (mapRef.current && Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]).then((granted) => {
        if (Object.values(granted).includes("granted")) {
          Geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            let region = {
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }

            animateToRegion(region);
          }, (err) => {
            console.log({ err })
          }, {
            enableHighAccuracy: true,
            timeout: 20000
          })
        }
      })
    }
  }, [mapRef])

  function animateToRegion(region) {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1500)
    }
  }

  function placeMarker(gesture) {
    setMarkers([...markers, { ...gesture.nativeEvent.coordinate }])
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={(ref) => mapRef.current = ref}
        style={styles.map}
        zoomEnabled
        zoomTapEnabled
        showsUserLocation
        zoomControlEnabled
        showsMyLocationButton
        onPress={placeMarker}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapRegion}
        onRegionChange={(region) => setMapRegion(region)}
      >
        {markers.map((marker, markerIdx) => (
          <Marker
            key={`${Date.now()}-marker-${markerIdx}`}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <Callout>
              <Text style={{ color: Colors.black }}>{marker.latitude} , {marker.longitude}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})

export default MapScreen
