import React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

function Map({ position }) {
  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          A marker indicating the location.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
