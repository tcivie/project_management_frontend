import { Marker } from 'pigeon-maps';
import Supercluster from 'supercluster';

const createMarker = (supercluster, geoJson, onclick) => {
  if (geoJson.properties.cluster) {
    const clusterId = geoJson.properties.cluster_id;
    const clusterSize = geoJson.properties.point_count;
    const clusteredPoints = supercluster.getChildren(clusterId);
    const cities = [];
    clusteredPoints.forEach((cp) => { if (cp.properties.city)cities.push(cp.properties.city); });
    return (
      <Marker
        key={clusterId}
        width={35 + Math.min(3 * clusterSize, 20)}
        anchor={geoJson.geometry.coordinates}
        color={`rgb(${Math.min((180 + clusterSize * 15), 255)},${Math.max((210 - clusterSize * 5), 0)},80)`}
        cities
        onClick={onclick}
        payload={cities}
      />
    );
  }
  const { city } = geoJson.properties;
  return (
    <Marker
      key={city.id}
      width={35}
      anchor={city.location}
      color="rgb(80,230,110)"
      cities={[city]}
      onClick={onclick}
      payload={[city]}
    />
  );
};
function convertBounds(sw, ne) {
  const difference = ne[0] - sw[0];
  const south = sw[0] + difference / 2;
  const west = sw[1] + difference / 2;
  const north = ne[0] - difference / 2;
  const east = ne[1] - difference / 2;

  return [west, south, east, north];
}
const getClusterMarkers = (zoomLevel, bounds, markers, onclick) => {
  const radius = 35 + 1.6 ** (15 - zoomLevel);
  const superCluster = new Supercluster({
    radius, // Cluster radius in pixels
    maxZoom: 16, // Maximum zoom level for clustering
    minZoom: 3,
  }).load(markers);

  const west = bounds.sw[1];
  let east = bounds.ne[1];

  // Adjust the bounds if crossing the antimeridian
  if (west > east) {
    east += 360; // Add 360 degrees to the east value
  }

  const clusteredMarkers = superCluster.getClusters(
    [bounds.sw[0], west, bounds.ne[0], east],
    zoomLevel,
  );
  console.log(clusteredMarkers);
  const use = clusteredMarkers.length ? clusteredMarkers : markers;
  return (use).map((x) => createMarker(superCluster, x, onclick));
};
export default getClusterMarkers;
