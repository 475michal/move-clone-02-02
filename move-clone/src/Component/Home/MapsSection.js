/* global google */


import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView } from '@react-google-maps/api';
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import icon1 from '../img/move.png';
import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from 'axios';

function MapsSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.45
  };

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523
  });

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [map, setMap] = useState(null);

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
        saveDataToServer({ source, destination, directionRoutePoints });
      } else {
        console.error('Error:', status);
      }
    });
  };

  const saveDataToServer = async (data) => {
    try {
      const response = await fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to save data to server');
      }
      const responseData = await response.json();
      console.log('Data saved successfully:', responseData);
    } catch (error) {
      console.error('Error saving data to server:', error.message);
    }
  };

  // const try3 = async () => {
  //   try {
  //     const response = await axios.get('https://localhost:7185/api/Review');
  //     if (response.status === 200) {
  //       console.log(response.data);
  //     } else {
  //       console.error('Failed to save user credentials');
  //     }
  //   } catch (error) {
  //     console.error('Error saving user credentials:', error.message);
  //   }
  // };

  return (
    <div>
      {/* <button onClick={try3}>try</button> */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: '4113717525f11867' }}
      >
        {source && (
          <MarkerF
            position={{ lat: source.lat, lng: source.lng }}
            icon={{
              url: icon1,
              scaledSize: {
                width: 40,
                height: 80
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
              url: icon1,
              scaledSize: {
                width: 40,
                height: 80
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
