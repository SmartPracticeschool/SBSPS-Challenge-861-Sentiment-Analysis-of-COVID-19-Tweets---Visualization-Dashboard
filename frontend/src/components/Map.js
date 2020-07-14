import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    fill: "#ef5350",
  },
});

const Map = ({ interactive, data }) => {
  const classes = useStyles();
  const [viewport, setViewPort] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4,
  });

  const [pin, setPin] = useState(null);

  const handleClick = (e, item) => {
    if (interactive) {
      e.preventDefault();
      setPin(item);
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      height="100%"
      width="100%"
      mapStyle="mapbox://styles/mohrsal/ckcai67x12aer1inyvqvgvs3v"
      mapboxApiAccessToken="pk.eyJ1IjoibW9ocnNhbCIsImEiOiJja2MyMGl2bXoxcXhwMnhsamhrejZlc3BiIn0.CLWjEj0GyozFbThndAZHhw"
      onViewportChange={
        interactive ? (viewport) => setViewPort(viewport) : null
      }
    >
      {data.map((item, index) => {
        return (
          <Marker
            key={index}
            latitude={parseFloat(item.latitude)}
            longitude={parseFloat(item.longitude)}
          >
            <LocationOnIcon
              className={classes.root}
              onClick={(e) => handleClick(e, item)}
            />
          </Marker>
        );
      })}
      {pin ? (
        <Popup
          latitude={parseFloat(pin.latitude)}
          longitude={parseFloat(pin.longitude)}
          closeOnClick={true}
          onClose={() => {
            setPin(null);
          }}
          closeButton={false}
        >
          <div style={{ color: "black", margin: "10px" }}>{pin.id}</div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default Map;
