import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const DEFAULT_VIEWPORT = {
  center: [32.9147, 35.2924],
  zoom: 17,
};
export default () => {
  const [active, setActive] = React.useState(false);
  const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT);
  const [markerPostiion, setMarkerPostiion] = React.useState([
    32.9147,
    35.2924,
  ]);

  const refmarker = React.useRef(null);

  const updatePosition = () => {
    const marker = refmarker.current;
    if (marker != null) {
      setMarkerPostiion(marker.leafletElement.getLatLng());
    }
  };

  return (
    <Map viewport={viewport}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={markerPostiion}
        draggable={true}
        ref={refmarker}
        onClick={() => setActive(!active)}
        onDragend={updatePosition}
      >
        <Popup>My Popup</Popup>
      </Marker>
    </Map>
  );
};
