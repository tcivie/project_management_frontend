const initialState = {
  posts: [],
  activeUsers: [],
  saves: [],
  helpful: [],
  comments: [],
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case 'POSTS_FETCHED':
      return {
        ...state,
        posts: action.payload,
      };
    case 'ACTIVE_USERS_FETCHED':
      return {
        ...state,
        activeUsers: action.payload,
      };
    case 'POST_CREATED':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case 'USER_JOINED':
      return {
        ...state,
        activeUsers: [...state.activeUsers, action.payload],
      };
    case 'USER_LEFT':
      return {
        ...state,
        activeUsers: state.activeUsers.filter((user) => user.id !== action.payload.id),
      };
    case 'USER_SAVED':
      return {
        ...state,
        saves: [...state.saves, action.payload],
      };
    case 'USER_UNSAVED':
      return {
        ...state,
        saves: state.saves.filter((save) => save.id !== action.payload.id),
      };
    case 'USER_LIKED':
      return {
        ...state,
        helpful: [...state.helpful, action.payload],
      };
    case 'USER_UNLIKED':
      return {
        ...state,
        helpful: state.helpful.filter((helpful) => helpful.id !== action.payload.id),
      };
    default:
      return state;
  }
}
