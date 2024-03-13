/* global google */


import { LoadScript, DirectionsRenderer, GoogleMap, MarkerF, OverlayView } from '@react-google-maps/api';
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";

import icondriver from '../../img/move-02.png';
import iconstart from '../../img/move-start-02.png';
import iconend from '../../img/move-end-02.png';

import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { fetchDriverCoordinates } from '../../Redux/slices/drivers';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDriverId } from '../../Redux/slices/orders';

function MapsSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.43
  };
  const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

  const [center, setCenter] = useState({
    lat: 32.0819,
    lng: 34.8004,
  });

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // const selectedDriverId = useSelector(state => state.orders.selectedDriverId);


  // מיקום מרכז המפה וטווח התצוגה
  // const center = {
  //   lat: 32.7940463,
  //   lng: 34.989571,
  // };
  const bounds = {
    north: 32.3272,
    south: 32.0819,
    east: 34.8557,
    west: 34.8004,
  };

  // Callback עבור טעינת המפה
  const onLoad = useCallback(function callback(map) {
    const newBounds = new window.google.maps.LatLngBounds(bounds);
    map.fitBounds(newBounds);
    setMap(map);
  }, []);

  // Callback עבור הסרת המפה
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);


  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng,
        zoom: 14,
        controlSize: 20,
      });

  
    }
    if (source && destination) {
      directionRoute();
    }
  }, [source, destination, map]);


  const directionRoute = () => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {

      if (status === google.maps.DirectionsStatus.OK) {
        setDirectionRoutePoints(result);
        // saveDataToServer({ source, destination, directionRoutePoints });
      } else {
        console.error('Error:', status);
      }
    });
  };


  const driverCoordinates = useSelector(state => state.driver.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDriverCoordinates());
    
  }, [dispatch]);

  useEffect(() => {
    console.log(driverCoordinates);
  }, [driverCoordinates]);


  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={8}
        center={{ lat: 32.0524754, lng: 34.9617757 }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        // options={{ mapId: '4113717525f11867' }}
        options={{ streetViewControl: false, fullscreenControl: false }}
        controlSize={20}

      >
        {driverCoordinates && driverCoordinates.map((coordinate, index) => (
          <MarkerF
            key={index}
            position={{ lat: coordinate.lat, lng: coordinate.lng }}
            icon={{
              url: icondriver,
              scaledSize: {
                width: 70,
                height: 60
              }
            }}
            onClick={() => {
              setSelectedMarker(coordinate);      
              console.log("id of driver"+coordinate.id);
              setSelectedDriver(coordinate.id);
              dispatch(setSelectedDriverId(coordinate.id)); // שליחת הנתון לרידקס
              // קביעת הנהג הנבחר
            }}
          />
        ))}

        {selectedMarker && (
          <OverlayView
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            onClick={() => setSelectedDriver(selectedMarker.id)      
          }

          >
            <div style={{ fontWeight: 'bolder', color: '#80CBC4' }}>{selectedMarker.name}</div>
          </OverlayView>
        )}

        {source && (
          <MarkerF
            position={{ lat: source.lat, lng: source.lng }}
            icon={{
              url: iconstart,
              scaledSize: {
                width: 70,
                height: 60
              }
            }}
          >
            <OverlayView
              position={{ lat: source.lat, lng: source.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white font-bold inline-block">
                <p className="text-black text-[16px]">{source.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
        )}

        {destination && (
          <MarkerF
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: iconend,
              scaledSize: {
                width: 70,
                height: 60
              }
            }}
          >
            <OverlayView
              position={{ lat: destination.lat, lng: destination.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white font-bold inline-block">
                <p className="text-black text-[16px]">{destination.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
        )}

        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: '#80cbc4',
              strokeWeight: 5
            },
            suppressMarkers: true
          }}
        />
      </GoogleMap>
    


    </div>
  );
}


export default MapsSection;
