const initialState = {
  type: null,
  content: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        type: action.payload.type,
        content: action.payload.content,
      };
    case 'CLEAR_MESSAGE':
      return initialState;
    default:
      return state;
  }
};

export default messageReducer;
