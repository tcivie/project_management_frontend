const initialState = {
  results: [],
  selection: null,
  loading: false,
  error: null,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_STARTED':
      return {
        ...state,
        loading: true,
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    case 'SEARCH_SELECTED':
      return {
        ...state,
        loading: false,
        selection: action.payload,
      };
    case 'SEARCH_DONE':
      return {
        ...state,
        loading: false,
        selection: null,
      };
    case 'SEARCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
