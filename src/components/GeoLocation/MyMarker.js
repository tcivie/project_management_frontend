import { Marker } from 'pigeon-maps';
import { useSelector } from 'react-redux';

function MyMarker(anchor) {
  return (
    <Marker
      width={50}
      anchor={anchor}
    />
  );
}

export default MyMarker;
