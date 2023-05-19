import { Map, Marker, ZoomControl } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from 'antd';
import { setGeolocation } from '../../redux/actions/userActions';
import MyDrawer from './MyDrawer';

const MAPTILER_ACCESS_TOKEN = 'MN4W1CFwpKKc3Or0Js4o';
const maptilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'streets');

function MyMap() {
  const searchSelection = useSelector((state) => state.search.selection);
  const userState = useSelector((state) => state.user);
  const [location, setLocation] = useState(null);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

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
      <Marker width={50} anchor={userState.location} onClick={showDrawer} />
      <MyDrawer
        visible={visible}
        onClose={onClose}
        locationInfo={userState.location}
        chatRoomInfo={[
          {
            language: 'English',
            emoji: '🇺🇸',
            activeUsers: 54,
          },
          {
            language: 'Spanish',
            emoji: '🇪🇸',
            activeUsers: 22,
          },
          {
            language: 'French',
            emoji: '🇫🇷',
            activeUsers: 131,
          },
          {
            language: 'German',
            emoji: '🇩🇪',
            activeUsers: 12,
          },
          {
            language: 'Hebrew',
            emoji: '🇮🇱',
            activeUsers: 42,
          },
        ]}
        stats={{
          averageResponseTime: 12,
          averageRating: 4.5,
          numberOfPosts: 123,
        }}
      />
      <ZoomControl />
    </Map>
  );
}

export default MyMap;
