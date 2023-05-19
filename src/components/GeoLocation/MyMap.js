import { Map, Marker, ZoomControl } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useDispatch, useSelector } from 'react-redux';
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
        locationInfo={{
          location: userState.location,
          localTime: '12:00 PM',
          otherInfo: 'Other info',
          nearbyCities: [
            {
              cityName: 'New York',
              countryName: 'United States',
              location: [40.7128, -74.006],
            },
            {
              cityName: 'Los Angeles',
              countryName: 'United States',
              location: [34.0522, -118.2437],
            },
            {
              cityName: 'Chicago',
              countryName: 'United States',
              location: [41.8781, -87.6298],
            },
            {
              cityName: 'Houston',
              countryName: 'United States',
              location: [29.7604, -95.3698],
            },
            {
              cityName: 'Phoenix',
              countryName: 'United States',
              location: [33.4484, -112.074],
            },
            {
              cityName: 'Philadelphia',
              countryName: 'United States',
              location: [39.9526, -75.1652],
            },
            {
              cityName: 'San Antonio',
              countryName: 'United States',
              location: [29.4241, -98.4936],
            },
            {
              cityName: 'San Diego',
              countryName: 'United States',
              location: [32.7157, -117.1611],
            },
            {
              cityName: 'Dallas',
              countryName: 'United States',
              location: [32.7767, -96.797],
            }],
        }}
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
          {
            language: 'Arabic',
            emoji: '🇸🇦',
            activeUsers: 12,
          },
          {
            language: 'Russian',
            emoji: '🇷🇺',
            activeUsers: 12,
          },
          {
            language: 'Chinese',
            emoji: '🇨🇳',
            activeUsers: 42,
          },
          {
            language: 'Japanese',
            emoji: '🇯🇵',
            activeUsers: 12,
          },
          {
            language: 'Korean',
            emoji: '🇰🇷',
            activeUsers: 12,
          },
          {
            language: 'Hindi',
            emoji: '🇮🇳',
            activeUsers: 12,
          },
          {
            language: 'Portuguese',
            emoji: '🇵🇹',
            activeUsers: 12,
          },
          {
            language: 'Italian',
            emoji: '🇮🇹',
            activeUsers: 12,
          },
          {
            language: 'Turkish',
            emoji: '🇹🇷',
            activeUsers: 12,
          },
        ]}
        stats={{
          averageResponseTime: 12,
          averageRating: 4.5,
          numberOfPosts: 123,
          trendingPosts: [
            {
              title: 'Post 1',
              description: 'Description 1',
              href: 'https://ant.design',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae',
            },
            {
              title: 'Post 2',
              description: 'Description 2',
              href: 'https://ant.design',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae',
            },
            {
              title: 'Post 3',
              description: 'Description 3',
              href: 'https://ant.design',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae',
            },
            {
              title: 'Post 4',
              description: 'Description 4',
              href: 'https://ant.design',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae',
            },
          ],
        }}
      />
      <ZoomControl />
    </Map>
  );
}

export default MyMap;
