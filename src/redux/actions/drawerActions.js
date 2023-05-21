// eslint-disable-next-line import/prefer-default-export
import { json } from 'react-router-dom';

export default function markerClick(location, radius) {
  // eslint-disable-next-line func-names
  return async function (dispatch) {
    // console.log('markerClick', marker, map);
    dispatch({ type: 'DRAWER_OPEN' });
    dispatch({ type: 'DRAWER_LOCATION_INFO', payload: location });

    try {
      console.log('markerClick', { point: location, radius });
      // Pull nearby cities
      const nearbyPoints = await fetch(`${process.env.REACT_APP_API_SERVER}/api/search/nearPoint`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ point: location, radius }),
      });
      const nearbyPointsJson = await nearbyPoints.json();
      console.log('nearbyPoints', nearbyPointsJson);
      dispatch({ type: 'DRAWER_NEARBY_CITIES', payload: nearbyPointsJson });
      // Pull chat rooms
      const chatRooms = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/languages`, {
        method: 'GET',
      });
      const chatRoomsJson = await chatRooms.json();
      console.log('chatRooms', chatRoomsJson);
      dispatch({ type: 'DRAWER_CHATROOM_INFO', payload: chatRoomsJson });
      // TODO: Pull stats
    } catch (error) {
      dispatch({ type: 'DRAWER_STATS', payload: null });
    }
  };
}

export function drawerClose() {
  return {
    type: 'DRAWER_CLOSE',
  };
}
