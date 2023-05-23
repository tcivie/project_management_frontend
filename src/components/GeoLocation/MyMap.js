import { Map, Marker, ZoomControl } from 'pigeon-maps';
import React, { useEffect, useState } from 'react';
import { maptiler } from 'pigeon-maps/providers';
import { useDispatch, useSelector } from 'react-redux';
import { timeout } from 'q';
import { Button, Tooltip } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { setGeolocation } from '../../redux/actions/userActions';
import MyDrawer from './MyDrawer';
import markerClick from '../../redux/actions/drawerActions';
import getClusterMarkers from './MarkerClusters';
import { reversePoint } from '../../utils/unicodeToEmoji';

const maptilerProvider = maptiler(process.env.REACT_APP_MAPTILER_CODE, 'streets');
function MyMap() {
  const searchSelection = useSelector((state) => state.search.selection);
  const [markers, setMarkers] = useState([]);
  const userState = useSelector((state) => state.user);
  const [mapCenter, setCenter] = useState(null);
  const [mapZoom, setZoom] = useState(null);
  const [mapBounds, setBounds] = useState(null);
  const dispatch = useDispatch();

  function calculateKmPerPixel(zoomLevel) {
    const earthRadius = 6371; // Earth's radius in kilometers
    const kmPerPixel = (256 * 2 ** (18 - zoomLevel)) / (2 * Math.PI * earthRadius);
    return kmPerPixel;
  }

  const onclick = (event) => {
    dispatch(markerClick(event));
  };
  const handleZoomChange = async () => {
    try {
      // sending register reuqest to server
      fetch(
        `${process.env.REACT_APP_API_SERVER}/api/search/nearPoint`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: 10000,
            point: reversePoint(mapCenter),
            radius: Math.min(500, calculateKmPerPixel(mapZoom || 16) * 30),
          }),
        },
      ).then((response) => response.json()).then((data) => {
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
        // eslint-disable-next-line max-len
        const clusters = getClusterMarkers(mapZoom, 100, mapBounds, newGeoJsons, onclick);
        setMarkers(clusters);
      });
    } catch (err) {
      // Handle any network or request error
      // eslint-disable-next-line no-console
      console.log('Error occurred:', err);
    }
  };

  const timeOutZoomChange = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      handleZoomChange();
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
    if (mapZoom && mapCenter && mapBounds) { timeOutZoomChange(); }
  }, [mapZoom, mapCenter]);

  useEffect(() => {
    if (searchSelection !== null) {
      const coordinates = searchSelection.location;
      setZoom(searchSelection.isCity ? 15 : 7);
      setCenter(reversePoint(coordinates));
      dispatch({ type: 'SEARCH_DONE' });
    }
  }, [searchSelection]);

  return (
    <>
      <Map
        dprs={[1, 2]}
        provider={maptilerProvider}
        height={500}
        defaultCenter={[50.879, 4.6997]}
        defaultZoom={11}
        zoom={mapZoom}
        center={mapCenter}
        onBoundsChanged={({ bounds, zoom, center }) => {
          setCenter(center);
          setZoom(zoom);
          setBounds(bounds);
        }}
      >
        {userState.location && (
        <Marker
          width={40}
          anchor={userState.location}
          color="royalblue"
          onClick={(event) => {
            dispatch(markerClick(event, userState.location, true));
          }}
        >
          <Tooltip title="My Location">
            <span style={{ marginLeft: '20px' }}>
              <Marker
                width={40}
                anchor={userState.location}
                color="royalblue"
              />
            </span>
          </Tooltip>
        </Marker>
        )}
        {markers}
        <ZoomControl />
        <Button
          type="primary"
          icon={<AimOutlined />}
        />
      </Map>
      <MyDrawer />
    </>
  );
}

export default MyMap;
