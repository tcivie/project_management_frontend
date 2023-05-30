export default function markerClick(event, userlocation, isUserMarker = false) {
  // eslint-disable-next-line func-names
  return async function (dispatch) {
    dispatch({ type: 'DRAWER_OPEN', payload: isUserMarker });
    if (isUserMarker) return;
    // Get a random index within the array length
    const randomIndex = event.payload.length ? Math.floor(Math.random() * event.payload.length) : 0;
    // Get the random element from the array
    const {
      id = null,
      country = null,
      location = event.anchor,
      name = null,
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
        location, name, wikiDataId, country, id,
      } || userlocation,
    });
    try {
      // Pull nearby cities
      fetch(`${process.env.REACT_APP_API_SERVER}/api/search/nearPoint`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ point: location, radius: 30 }),
      }).then((res) => res.json())
        .then((data) => dispatch({ type: 'DRAWER_NEARBY_CITIES', payload: data }));
      // Pull chat rooms
      fetch(`${process.env.REACT_APP_API_SERVER}/api/chat/languages`, {
        method: 'GET',
      }).then((res) => res.json())
        .then((data) => dispatch({ type: 'DRAWER_CHATROOM_INFO', payload: data }));
    } catch (error) {
      dispatch({ type: 'DRAWER_STATS', payload: null });
    }
  };
}

export function drawerClose() {
  return { type: 'DRAWER_CLOSE' };
}
