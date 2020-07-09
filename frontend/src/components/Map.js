import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

const Map = ({ interactive }) => {
  const [viewport, setViewPort] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });
  return (
    <ReactMapGL
      {...viewport}
      height="100%"
      width="100%"
      mapStyle="mapbox://styles/mohrsal/ckcai67x12aer1inyvqvgvs3v"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
      onViewportChange={
        interactive ? (viewport) => setViewPort(viewport) : null
      }
    ></ReactMapGL>
  );
};

export default Map;
