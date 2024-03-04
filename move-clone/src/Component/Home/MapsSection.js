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

function MapsSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.43
  };
  const GOOGLEMAP_KEY = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

  const [center, setCenter] = useState({
    lat: 32.0524754,
    lng: 34.9617757,
    zoom: 40

  });

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);


  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);



  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng
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
        center={center}
        zoom={40}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: '4113717525f11867' }}
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
            onClick={() => setSelectedMarker(coordinate)}
          />
        ))}

        {selectedMarker && (
          <OverlayView
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ fontWeight: 'bolder',color:'#80CBC4' }}>{selectedMarker.name}</div>
          </OverlayView>
        )}

        {source && (
          <MarkerF
            position={{ lat: source.lat, lng: source.lng }}
            icon={{
              url: iconstart,
              scaledSize: {
                width:70,
                height:60
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
