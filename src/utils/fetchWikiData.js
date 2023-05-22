// Fetch data from wiki API wtih wikiDataId
export default async function fetchWikiData(wikiDataId) {
  const URL = `https://en.wikipedia.org/wiki/${wikiDataId}`;
  return fetchOpenGraphData(URL);
}

export async function fetchOpenGraphData(wikiId) {
  const url = `${process.env.REACT_APP_API_SERVER}/api/cors/wiki?wikiId=${wikiId}`;
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        console.log('response', response);
        return response.json();
      }
      throw new Error('Network response was not ok.');
    });
}
