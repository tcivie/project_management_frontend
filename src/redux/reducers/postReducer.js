const initialState = {
  posts: [],
  activeUsers: [],
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
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
}
