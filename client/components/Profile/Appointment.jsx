import React from "react";
import { Grid, Header, Image, Button, Modal } from "semantic-ui-react";
import styles from "./Profile.module.css";

function Appointment() {
  return (
    <Modal
      trigger={<Button basic>View/Change Appointment</Button>}
      header="Reminder!"
      content="Call Benjamin regarding the reports."
      actions={["Snooze", { key: "done", content: "Done", positive: true }]}
    />
  );
}

export default Appointment;
