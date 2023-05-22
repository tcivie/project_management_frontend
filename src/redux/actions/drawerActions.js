export default function markerClick(event, userlocation, isUserMarker = false) {
  return async function (dispatch) {
    // console.log('markerClick', marker, map);
    dispatch({ type: 'DRAWER_OPEN', payload: isUserMarker });
    if (isUserMarker) return;
    // eslint-disable-next-line func-names
    // Get a random index within the array length
    const randomIndex = event.payload.length ? Math.floor(Math.random() * event.payload.length) : 0;
    // Get the random element from the array
    const {
      country = null,
      id = null,
      location = event.anchor,
      name = null,
      stateName = null,
      wikiDataId = null,
    } = event.payload[randomIndex] || {
      country: null,
      id: null,
      location: event.anchor,
      name: null,
      stateName: null,
      wikiDataId: null,
    };
    dispatch({
      type: 'DRAWER_LOCATION_INFO',
      payload: {
        location, name, wikiDataId, country,
      } || userlocation,
    });
    try {
      // Pull nearby cities
      const nearbyPoints = await fetch(`${process.env.REACT_APP_API_SERVER}/api/search/nearPoint`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ point: location, radius: 30 }),
      });
      const nearbyPointsJson = await nearbyPoints.json();
      dispatch({ type: 'DRAWER_NEARBY_CITIES', payload: nearbyPointsJson });
      // Pull chat rooms
      const chatRooms = await fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/languages`, {
        method: 'GET',
      });
      const chatRoomsJson = await chatRooms.json();
      dispatch({ type: 'DRAWER_CHATROOM_INFO', payload: chatRoomsJson });
      // TODO: Pull stats
    } catch (error) {
      dispatch({ type: 'DRAWER_STATS', payload: null });
    }
  };
}

export function drawerClose() {
  return { type: 'DRAWER_CLOSE' };
}
