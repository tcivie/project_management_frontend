import { Map, Marker, ZoomControl } from 'pigeon-maps';

import React, { useEffect, useState, useRef } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useDispatch, useSelector } from 'react-redux';
import { setGeolocation } from '../../redux/actions/userActions';
import getClusterMarkers from './MarkerClusters';
import MyDrawer from './MyDrawer';

const MAPTILER_ACCESS_TOKEN = 'MN4W1CFwpKKc3Or0Js4o';
const maptilerProvider = maptiler(MAPTILER_ACCESS_TOKEN, 'streets');

function MyMap() {
  const searchSelection = useSelector((state) => state.search.selection);
  const userState = useSelector((state) => state.user);
  const [clickedMarker, setClickedMarker] = useState(null);
  const timeout = useRef(null);
  const [location, setLocation] = useState(null);
  const [visible, setVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [mapZoom, setZoom] = useState(11);
  const dispatch = useDispatch();

  const showDrawer = (marker) => {
    setClickedMarker(marker.payload);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  function calculateRadius(zoomLevel) {
    const zoomScaleDict = {
      0: 156412,
      1: 78206,
      2: 39096,
      3: 19548,
      4: 9774,
      5: 4884,
      6: 2442,
      7: 1222,
      8: 610.984,
      9: 305.492,
      10: 152.746,
      11: 76.373,
      12: 38.187,
      13: 19.093,
      14: 9.547,
      15: 4.773,
      16: 2.387,
      17: 1.193,
      18: 0.596,
    };

    // Ensure zoom level is within valid range
    const clampedZoomLevel = Math.max(6, Math.min(18, Math.floor(zoomLevel)));

    // Get radius based on the zoom level
    const radius = zoomScaleDict[clampedZoomLevel];

    return radius;
  }

  const handleZoomChange = async (zoom, center, bounds) => {
    try {
      // sending register reuqest to server
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/api/search/nearPoint`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 10000,
            point: center,
            radius: calculateRadius(zoom),
          }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        const newGeoJsons = [];
        data.forEach((city) => {
          newGeoJsons.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: city.location,
            },
            properties: {
              name: city.name,
              city,
            },
          });
        });

        const clusters = getClusterMarkers(zoom, bounds, newGeoJsons, showDrawer);
        setMarkers(clusters);
      }
    } catch (err) {
      // Handle any network or request error
      // eslint-disable-next-line no-console
      console.log('Error occurred:', err);
    }
  };

  const timeOutZoomChange = async (zoom, center, bounds) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(async () => {
      await handleZoomChange(zoom, center, bounds);
    }, 500);
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
      setZoom(13);
    }
  }, [searchSelection]);

  return (
    <Map
      provider={maptilerProvider}
      height={400}
      defaultCenter={[50.879, 4.6997]}
      center={location}
      zoom={mapZoom}
      defaultZoom={mapZoom}
      // eslint-disable-next-line max-len
      onBoundsChanged={({ zoom, center, bounds }) => timeOutZoomChange(zoom, center, bounds)}
    >

      {markers}

      {userState.location && (
      <Marker
        width={60}
        anchor={userState.location}
        color="rgb(80,200,80)"
      />
      )}

      <MyDrawer
        cities={clickedMarker}
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
