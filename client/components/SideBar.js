import React from "react";
import styles from "./appointment.module.css";
import { Grid, Input, Image, Modal, Button } from "semantic-ui-react";
import Calendar from "react-calendar";

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
  }
  console.log(placeInput);
  counsellors.forEach((counsellor) => {
    counsellor["distance"] = getDistance(placeInput, counsellor.address);
  });
  counsellors.sort(compare);
  return (
    <>
      {counsellors.map((counsellor) => (
        <div className={styles.counsellor}>
          <Image
            floated="left"
            src="https://avatarfiles.alphacoders.com/837/thumb-83705.png"
            circular
            size="tiny"
          />
          <div className={styles.counsellordesc}>
            <text className={styles.name}>
              Counsellor's name:
              <span className={styles.nonbold}> {counsellor.username}</span>
            </text>
            <br></br>
            <text className={styles.name}>
              Distance:{" "}
              <span className={styles.nonbold}>
                {(counsellor.distance / 1000).toFixed(2)}km
              </span>
            </text>
            <br></br>
            <Modal
              trigger={<Button>Make Appointment</Button>}
              header="Available Timings"
              content="Call Benjamin regarding the reports."
              actions={[
                "Cancel",
                { key: "done", content: "Done", positive: true },
              ]}
            >
              <Modal.Content>
                <Calendar />
              </Modal.Content>
            </Modal>
          </div>
        </div>
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
