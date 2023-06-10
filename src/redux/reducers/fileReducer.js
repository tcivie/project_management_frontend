const initialState = {
  fileList: [],
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILE_LIST':
      return { ...state, fileList: action.payload };
    default:
      return state;
  }
};

export default fileReducer;
