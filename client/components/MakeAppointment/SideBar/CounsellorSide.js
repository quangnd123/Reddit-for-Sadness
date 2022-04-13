import React, { useContext, useState, Component } from "react";
import { Grid, Input, Image, Modal, Button, Alert } from "semantic-ui-react";
import styles from "../appointment.module.css";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../../../context/auth.js";
import Calendar from "react-calendar";
import { makeAppointment } from "../../../graphql/mutation.js";
import { useMutation } from "@apollo/react-hooks";

function CounsellorSide({ username, distance, counsellorID, address }) {
  const { user } = useContext(AuthContext);
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  const [date, setDate] = useState(start);
  const [serverErrors, setServerErrors] = useState({});
  const [success, setSuccess] = useState("");
  const onChange = (date) => {
    setDate(date);
    console.log(date);
  };

  const values = {
    userID: user?._id,
    counsellorID: counsellorID,
    date: date,
    address: { lat: address.lat.toString(), lng: address.lng.toString() },
  };
  const [appoint, { loading }] = useMutation(makeAppointment, {
    update(proxy, result) {
      setSuccess("Success");
    },
    onError(err) {
      //console.log(err.networkError?.result.errors);
      //console.log(err.graphQLErrors[0]?.extensions.errors);
      setServerErrors(err.graphQLErrors[0]?.extensions.errors);
      console.log(serverErrors);
    },
    variables: values,
  });
  if (loading) {
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    setServerErrors({});
    appoint();
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
                <Calendar
                  onChange={onChange}
                  value={date}
                  calendarType="US"
                  minDate={new Date(2022, 3, 13)}
                />
                <div className={styles.calDate}>
                  {date.toString().slice(4, 15)}
                </div>
              </div>
              <div>
                <p>{serverErrors.message}</p>
                <p>
                  {success && (
                    <div className={styles.successMessage}>
                      Appointment booked successfully
                    </div>
                  )}
                </p>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={onSubmit} positive>
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
