import React from "react";

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
    return <div>Please input your location</div>;
  }
  console.log(placeInput);
  counsellors.forEach((counsellor) => {
    counsellor["distance"] = getDistance(placeInput, counsellor.address);
  });
  counsellors.sort(compare);
  return (
    <div>
      {counsellors.map((counsellor) => (
        <div>
          <text>counsellor's name: {counsellor.username}</text>
          <br></br>
          <text>distance: {counsellor.distance} m</text>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default SideBar;

// {counsellors.map((counsellor)=>(
//     <div>
//         <h1>{counsellor.username}</h1>
//         <h2>{counsellor.distance}</h2>
//     </div>
// ))}
