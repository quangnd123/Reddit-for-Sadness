import React, { useContext, useState } from "react";
import { Grid, Header, Image, Button, Modal } from "semantic-ui-react";
import styles from "./Profile.module.css";
import { getUserAppointments } from "../../graphql/query.js";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth.js";

function Appointment() {
  const { user } = useContext(AuthContext);
  const id = user._id;
  const { loading, data, error } = useQuery(getUserAppointments, {
    variables: { userID: id },
  });
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  const userAppointments = data.getUserAppointments;
  console.log(userAppointments);
  console.log(user);

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
