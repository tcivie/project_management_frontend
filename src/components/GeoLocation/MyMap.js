import { Map, Marker, ZoomControl } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useDispatch, useSelector } from 'react-redux';
import { timeout } from 'q';
import { setGeolocation } from '../../redux/actions/userActions';
import MyDrawer from './MyDrawer';
import markerClick from '../../redux/actions/drawerActions';
import getClusterMarkers from './MarkerClusters';

const maptilerProvider = maptiler(process.env.REACT_APP_MAPTILER_CODE, 'streets');

function MyMap() {
  const searchSelection = useSelector((state) => state.search.selection);
  const [markers, setMarkers] = useState([]);
  const userState = useSelector((state) => state.user);
  const [mapCenter, setCenter] = useState(null);
  const [mapZoom, setZoom] = useState(null);
  const [mapBounds, setBounds] = useState(null);
  const dispatch = useDispatch();

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
    console.log(zoomLevel);
    // Ensure zoom level is within valid range
    const clampedZoomLevel = Math.max(6, Math.min(18, Math.floor(zoomLevel)));

    // Get radius based on the zoom level
    const radius = zoomScaleDict[clampedZoomLevel];

    return radius;
  }

  const handleZoomChange = async () => {
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
            point: mapCenter,
            radius: calculateRadius(mapZoom || 30),
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
        const onclick = (event) => {
          dispatch(markerClick(event));
        };
        // eslint-disable-next-line max-len
        const clusters = getClusterMarkers(mapZoom, mapBounds, newGeoJsons, onclick);
        setMarkers(clusters);
      }
    } catch (err) {
      // Handle any network or request error
      // eslint-disable-next-line no-console
      console.log('Error occurred:', err);
    }
  };

  const timeOutZoomChange = async () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(async () => {
      await handleZoomChange();
    }, 250);
  };
  useEffect(() => {
    // Get current position coordinates
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
    console.log(mapZoom, mapBounds, mapCenter);
    if (mapZoom && mapCenter && mapBounds) { timeOutZoomChange(); }
  }, [mapZoom, mapCenter]);

  useEffect(() => {
    if (searchSelection !== null) {
      const coordinates = searchSelection.location;
      setCenter(coordinates);
    }
  }, [searchSelection]);

  return (
    <Map
      provider={maptilerProvider}
      height={500}
      defaultCenter={[50.879, 4.6997]}
      defaultZoom={11}
      center={mapCenter}
      onBoundsChanged={({ bounds, zoom, center }) => {
        console.log(bounds, center, zoom);

        setCenter(center);
        setZoom(zoom);
        setBounds(bounds);
      }}
    >
      {userState.location && (
      <Marker
        width={35}
        anchor={userState.location}
        onClick={() => {
          dispatch(markerClick(userState.location, mapZoom));
        }}
      />
      )}
      {markers}
      <MyDrawer />
      <ZoomControl />
    </Map>
  );
}

export default MyMap;
