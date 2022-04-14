import React, { useEffect, useState, useRef } from 'react'
import BottomSheet from 'reanimated-bottom-sheet';
import Geolocation from '@react-native-community/geolocation'
import NewAnnotationForm from './components/NewAnnotationForm';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import {
  Text,
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
  const bottomSheetRef = useRef()

  const [canScrollMap, setCanScrollMap] = useState(true)
  const [markers, setMarkers] = useState([])
  const [newMarker, setNewMarker] = useState()
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
  }, [])

  function animateToRegion(region) {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1500)
    }
  }

  function placeMarker(gesture) {
    setNewMarker(gesture.nativeEvent.coordinate)
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapTo(1)
    }
  }

  function handleNewMarkerCalloutPress() {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapTo(0)
    }
  }

  function handleNewAnnotation() {

  }

  return (
    <>
      <KeyboardAwareScrollView scrollEnabled={false} contentContainerStyle={styles.mapContainer}>
        <MapView
          zoomEnabled
          ref={mapRef}
          zoomTapEnabled
          showsUserLocation
          style={styles.map}
          zoomControlEnabled
          onPress={placeMarker}
          showsMyLocationButton
          initialRegion={mapRegion}
          provider={PROVIDER_GOOGLE}
          scrollEnabled={canScrollMap}
          onRegionChange={setMapRegion}
        >
          {newMarker && (
            <Marker
              key={`${Date.now()}-marker-${Number.MAX_VALUE}`}
              draggable
              pinColor='yellow'
              coordinate={newMarker}
              onCalloutPress={handleNewMarkerCalloutPress}
              onDragEnd={(event) => {
                setNewMarker(event.nativeEvent.coordinate)
              }}
            >
              <Callout>
                <Text style={styles.newMarkerCalloutText}>
                  Nova Anotação
                </Text>
              </Callout>
            </Marker>
          )}
          {markers.map((marker, markerIdx) => (
            <Marker
              key={`${Date.now()}-marker-${markerIdx}`}
              pinColor='green'
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
        <BottomSheet
          initialSnap={1}
          borderRadius={10}
          ref={bottomSheetRef}
          snapPoints={['25%', 0]}
          renderContent={() => (
            <NewAnnotationForm
              newMarker={newMarker}
              onSubmit={handleNewAnnotation}
              closeSheet={() => bottomSheetRef.current.snapTo(1)}
            />
          )}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%'
  },
  newMarkerCalloutText: {
    color: Colors.dark,
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
})

export default MapScreen
