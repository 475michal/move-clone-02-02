import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { SourceContext } from "../Context/SourceContext";
import { DestinationContext } from "../Context/DestinationContext";
import icon1 from '../img/move.png';

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
  const { destination, setDestination } = useContext(DestinationContext);

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      setCenter({
        lat: source.lat,
        lng: source.lng
      });
    }
  }, [source, map]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng && map) {
      map.panTo({
        lat: destination.lat,
        lng: destination.lng
      });
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      });
    }
  }, [destination, map]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '4113717525f11867' }}
    >
      {source && source.lat && source.lng ? (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: icon1,
            scaledSize: {
              width: 40,
              height: 80
            }
          }} />
      ) : null}

      {destination && destination.lat && destination.lng ? (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: icon1,
            scaledSize: {
              width: 40,
              height: 80
            }
          }} />
      ) : null}
    </GoogleMap>
  );
}

export default MapsSection;
