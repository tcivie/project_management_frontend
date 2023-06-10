// reducers/tagReducer.js
const initialState = {
  tags: [],
  inputVisible: false,
  inputValue: '',
  editInputIndex: -1,
  editInputValue: '',
  isError: false,
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_INPUT_VISIBLE':
      return { ...state, inputVisible: action.payload };
    case 'SET_INPUT_VALUE':
      return { ...state, inputValue: action.payload };
    case 'SET_EDIT_INPUT_INDEX':
      return { ...state, editInputIndex: action.payload };
    case 'SET_EDIT_INPUT_VALUE':
      return { ...state, editInputValue: action.payload };
    case 'SET_ERROR':
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};

export default tagReducer;
