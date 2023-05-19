import { Map } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useSelector } from 'react-redux';

const MAPTILER_ACCESS_TOKEN = 'MN4W1CFwpKKc3Or0Js4o';
const maptilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'streets');

function MyMap() {
  const searchSelection = useSelector((state) => state.search.selection);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get current position coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // const { latitude, longitude } = position.coords;
        setLocation(position.coords);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error('Error retrieving geolocation:', error);
      },
    );
  }, []);

  useEffect(() => {
    if (searchSelection !== null) {
      const coordinates = searchSelection.location;
      console.log(coordinates);
      setLocation(coordinates);
    }
  }, [searchSelection]);

  return (
    <Map
      provider={maptilerProvider}
      height={400}
      defaultCenter={[50.879, 4.6997]}
      center={location}
      zoom={location ? 9 : 11}
      defaultZoom={11}
    />
  );
}

export default MyMap;
