import { Marker } from 'pigeon-maps';
import Supercluster from 'supercluster';
import { Tooltip } from 'antd';
import { reversePoint } from '../../utils/unicodeToEmoji';

function DivMarker({
  left, top, style, children,
}) {
  return (
    <div style={{
      position: 'absolute',
      left,
      top,
      ...(style || {}),
    }}
    >{children}
    </div>
  );
}

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
        anchor={reversePoint(geoJson.geometry.coordinates)}
        color={`rgb(${Math.min((180 + clusterSize * 15), 255)},${Math.max((210 - clusterSize * 5), 0)},80)`}
        cities
        onClick={onclick}
        payload={cities}
      >
        <Tooltip color="blue" title={`${clusterSize} Cities`} overlayInnerStyle={{ marginLeft: 'auto' }}>
          <span style={{ marginLeft: `${(35 + Math.min(3 * clusterSize, 20)) / 2}px` }}>
            <Marker color={`rgb(${Math.min((180 + clusterSize * 15), 255)},${Math.max((210 - clusterSize * 5), 0)},80)`} width={35 + Math.min(3 * clusterSize, 20)} anchor={reversePoint(geoJson.geometry.coordinates)} />
          </span>
        </Tooltip>
      </Marker>
    );
  }
  const { city } = geoJson.properties;
  return (

    <Marker
      key={city.id}
      width={30}
      anchor={reversePoint(city.location)}
      color="rgb(80,230,110)"
      cities={[city]}
      onClick={onclick}
      payload={[city]}
    >

      <Tooltip
        title={city.name}
        color="blue"
      >
        <span style={{ marginLeft: '15px' }}>
          <Marker color="rgb(80,230,110)" width={35} anchor={reversePoint(geoJson.geometry.coordinates)} />
        </span>
      </Tooltip>
    </Marker>

  );
};

const getClusterMarkers = (zoomLevel, radius, bounds, markers, onclick) => {
  const superCluster = new Supercluster({
    radius, // Cluster radius in pixels
    maxZoom: 18, // Maximum zoom level for clustering
    minZoom: 2,
    nodeSize: 32,
  }).load(markers);

  const clusteredMarkers = superCluster.getClusters(
    [bounds.sw[1], bounds.sw[0], bounds.ne[1], bounds.ne[0]],
    zoomLevel,
  );
  const use = clusteredMarkers.length ? clusteredMarkers : markers;
  return (use).map((x) => createMarker(superCluster, x, onclick));
};
export default getClusterMarkers;
