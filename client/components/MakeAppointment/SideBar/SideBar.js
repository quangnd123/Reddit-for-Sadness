import React from "react";
import styles from "../appointment.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SideBarErrorInput from "./SideBarErrorInput";
import CounsellorSide from "./CounsellorSide";

function compare(a, b) {
  if (a.distance < b.distance) {
    return -1;
  }
  if (a.distance > b.distance) {
    return 1;
  }
  return 0;
}

function rad(x) {
  return (x * Math.PI) / 180;
}

function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}

const SideBar = ({ placeInput, counsellors }) => {
  if (Object.keys(placeInput).length === 0) {
    return (
      <div className={styles.input}>
        Available counsellors will be displayed below
      </div>
    );
  } else if (
    placeInput.lng <= 103.633 ||
    placeInput.lng >= 104.025988 ||
    placeInput.lat >= 1.467819 ||
    placeInput.lat <= 1.2345
  ) {
    return <SideBarErrorInput />;
  }
  console.log(placeInput);
  counsellors.forEach((counsellor) => {
    counsellor["distance"] = getDistance(placeInput, counsellor.address);
  });
  counsellors.sort(compare);
  return (
    <>
      <div className={styles.input}>Your nearest counsellors are:</div>
      {counsellors.map((counsellor) => (
        <CounsellorSide
          username={counsellor.username}
          distance={counsellor.distance}
          counsellorID={counsellor._id}
          address={counsellor.address}
        />
      ))}
    </>
  );
};

export default SideBar;

// {counsellors.map((counsellor)=>(
//     <div>
//         <h1>{counsellor.username}</h1>
//         <h2>{counsellor.distance}</h2>
//     </div>
// ))}
