import { Map, Marker, ZoomControl } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useDispatch, useSelector } from 'react-redux';
import MyMarker from './MyMarker';
import { setGeolocation } from '../../redux/actions/userActions';

const MAPTILER_ACCESS_TOKEN = 'MN4W1CFwpKKc3Or0Js4o';
const maptilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'streets');

function MyMap() {
  const searchSelection = useSelector((state) => state.search.selection);
  const userState = useSelector((state) => state.user);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get current position coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
        dispatch(setGeolocation([latitude, longitude]));
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
      zoom={9}
      defaultZoom={11}
    >
      <Marker anchor={userState.location} />
      <ZoomControl />
    </Map>
  );
}

export default MyMap;
