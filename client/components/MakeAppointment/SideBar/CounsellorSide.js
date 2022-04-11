import React, { useContext, useState, Component } from "react";
import { Grid, Input, Image, Modal, Button } from "semantic-ui-react";
import styles from "../appointment.module.css";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../../../context/auth.js";
import Calendar from "react-calendar";

function CounsellorSide({ username, distance }) {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  const [open, setOpen] = useState(false);

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
        {user && (
          <Modal
            trigger={<Button>Make Appointment</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
          >
            <Modal.Header>Available Timings!</Modal.Header>
            <Modal.Content>
              <div className={styles.cal}>
                <Calendar onChange={onChange} value={date} />
                <div className={styles.calDate}>
                  {date.toString().slice(4, 15)}
                </div>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={() => setOpen(false)} positive>
                Confirm
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default CounsellorSide;
