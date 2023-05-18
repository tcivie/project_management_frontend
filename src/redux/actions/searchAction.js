export default function fetchSearchResults(searchTerm) {
  return async function (dispatch) {
    dispatch({ type: 'SEARCH_STARTED' });

    try {
      console.log(`${process.env.REACT_APP_API_SERVER}/api/search/query`);
      console.log(searchTerm);
      // add body to the request

      const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/search/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      const data = await response.json();
      console.log(data);

      dispatch({ type: 'SEARCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SEARCH_FAILURE', error });
    }
  };
}
