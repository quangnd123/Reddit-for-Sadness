import React, { useState } from "react";
import {
  Autocomplete,
  useJsApiLoader,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { Input, Icon } from "semantic-ui-react";
import styles from "./appointment.module.css";

const GoogleMapAPI = ({ setPlaceInput, placeInput, counsellors }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (value) => {
    setAutocomplete(value);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setPlaceInput({ lat, lng });
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDqMrNKSBFKlhgI3m8zzv7Bu627qLimNZ0",
    libraries: ["places"],
  });
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <div className={styles.googlemap}>
      <GoogleMap
        mapContainerStyle={{
          height: "100vh",
          width: "100%",
        }}
        zoom={12}
        center={{
          lat: 1.3521,
          lng: 103.8198,
        }}
      >
        {counsellors.map((counsellor) => (
          <Marker
            icon={
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            }
            position={counsellor.address}
            label={counsellor.username}
          />
        ))}
        {placeInput.lat && (
          <Marker
            icon={{
              path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
              fillColor: "yellow",
              fillOpacity: 0.9,
              strokeColor: "gold",
              strokeWeight: 2,
              scale: 2,
            }}
            position={placeInput}
          />
        )}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <Input
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `300px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
            placeholder="Where are you?"
            focus
          />
        </Autocomplete>
      </GoogleMap>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default GoogleMapAPI;
