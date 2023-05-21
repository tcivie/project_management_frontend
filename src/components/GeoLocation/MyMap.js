import { Map, Marker, ZoomControl } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useDispatch, useSelector } from 'react-redux';
import { setGeolocation } from '../../redux/actions/userActions';
import MyDrawer from './MyDrawer';
import markerClick from '../../redux/actions/drawerActions';

const MAPTILER_ACCESS_TOKEN = 'MN4W1CFwpKKc3Or0Js4o';
const maptilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'streets');

function MyMap() {
  const searchSelection = useSelector((state) => state.search.selection);
  const drawerReducer = useSelector((state) => state.drawer);
  const userState = useSelector((state) => state.user);
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get current position coordinates
    console.log('Getting current position...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
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
      setCenter(coordinates);
    }
  }, [searchSelection]);

  return (
    <Map
      provider={maptilerProvider}
      height={400}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={11}
      center={center}
      /* eslint-disable-next-line no-shadow */
      onBoundsChanged={({ center, zoom }) => {
        setCenter(center);
        setZoom(zoom);
      }}
    >
      <Marker
        width={50}
        anchor={userState.location}
        onClick={() => {
          dispatch(markerClick(userState.location, zoom));
        }}
      />
      <MyDrawer />
      <ZoomControl />
    </Map>
  );
}

export default MyMap;
