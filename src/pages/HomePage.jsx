import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function HomePage() {
  const [city, setCity] = useState('');
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Use your own API endpoint or service to fetch the coordinates for the given city
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoiYmFybW9yMTIiLCJhIjoiY2xocmhpYWduMDN0bTNnbG9kZmZkMmd0MSJ9.q1ZKRO8qEDNeS0z78TI7nQ`
        );
        const data = await response.json();
        const [longitude, latitude] = data.features[0].center;
        setMapPosition([latitude, longitude]);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    if (city) {
      fetchCoordinates();
    }
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  // Create a custom map icon using the Mapbox marker icon
  const customIcon = L.icon({
    iconUrl: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.41898,37.75965,0,0/200x200?access_token=pk.eyJ1IjoiYmFybW9yMTIiLCJhIjoiY2xocmhpYWduMDN0bTNnbG9kZmZkMmd0MSJ9.q1ZKRO8qEDNeS0z78TI7nQ',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  return (
    <div className="home-page">
      <h2>Welcome to Our Website</h2>
    
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleSearch}
          placeholder="Enter a city name"
        />
        <button type="submit">Search</button>
      </form>
      <MapContainer
        center={mapPosition}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; Mapbox &copy; OpenStreetMap"
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmFybW9yMTIiLCJhIjoiY2xocmhpYWduMDN0bTNnbG9kZmZkMmd0MSJ9.q1ZKRO8qEDNeS0z78TI7nQ"
          maxZoom={18}
          tileSize={512}
          zoomOffset={-1}
          id="mapbox/light-v10" // Replace with your preferred Mapbox style ID
        />
        {city && (
          <Marker position={mapPosition} icon={customIcon}>
            <Popup>A marker indicating the location.</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default HomePage;
