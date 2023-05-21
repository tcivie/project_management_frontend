export function fetchSearchResults(searchTerm) {
  // eslint-disable-next-line func-names
  return async function (dispatch) {
    dispatch({ type: 'SEARCH_STARTED' });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/search/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      const data = await response.json();

      dispatch({ type: 'SEARCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SEARCH_FAILURE', error });
    }
  };
}

export function setSelectedSearch(result) {
  return {
    type: 'SEARCH_SELECTED',
    payload: result,
  };
}
