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
        width={50 + Math.min(clusterSize, 20)}
        anchor={geoJson.geometry.coordinates}
        color={`rgb(${Math.min(80 + clusterSize * 20, 255)},${Math.max(200 - clusterSize * 5, 0)},80)`}
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
      width={50}
      anchor={city.location}
      color="rgb(80,200,80)"
      cities={[city]}
      onClick={onclick}
      payload={[city]}
    />
  );
};
const getClusterMarkers = (zoomLevel, bounds, markers, onclick) => {
  const superCluster = new Supercluster({
    radius: 60, // Cluster radius in pixels
    maxZoom: 16, // Maximum zoom level for clustering
  }).load(markers);
  const clusteredMarkers = superCluster.getClusters(
    [bounds.sw[0], bounds.sw[1], bounds.ne[0], bounds.ne[1]],
    zoomLevel,
  );
  return clusteredMarkers.map((x) => createMarker(superCluster, x, onclick));
};
export default getClusterMarkers;
