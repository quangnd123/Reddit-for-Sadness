import React from "react";
import { Grid, Input, Image, Modal, Button } from "semantic-ui-react";
import styles from "../appointment.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CounsellorSide({ username, distance }) {
  return (
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
          <span className={styles.nonbold}> {username}</span>
        </text>
        <br></br>
        <text className={styles.name}>
          Distance:{" "}
          <span className={styles.nonbold}>
            {(distance / 1000).toFixed(2)}km
          </span>
        </text>
        <br></br>
        <Modal
          trigger={<Button>Make Appointment</Button>}
          header="Available Timings"
          content="Call Benjamin regarding the reports."
          actions={["Cancel", { key: "done", content: "Done", positive: true }]}
        >
          <Modal.Content className={styles.calendar}>
            <Calendar />
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
}

export default CounsellorSide;
