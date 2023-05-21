// visible, onClose, locationInfo, chatRoomInfo, stats,
const initialState = {
  visible: false,
  locationInfo: null,
  chatRoomInfo: null,
  nearbyCities: null,
  stats: null,
};

export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case 'DRAWER_OPEN':
      return {
        ...state,
        visible: true,
      };
    case 'DRAWER_CLOSE':
      return {
        ...state,
        visible: false,
      };
    case 'DRAWER_LOCATION_INFO':
      return {
        ...state,
        locationInfo: action.payload,
      };
    case 'DRAWER_CHATROOM_INFO':
      return {
        ...state,
        chatRoomInfo: action.payload,
      };
    case 'DRAWER_NEARBY_CITIES':
      return {
        ...state,
        nearbyCities: action.payload,
      };
    case 'DRAWER_STATS':
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
}
