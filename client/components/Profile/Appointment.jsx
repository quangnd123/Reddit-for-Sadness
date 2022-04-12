import React, { useContext, useState } from "react";
import {
  Grid,
  Header,
  Image,
  Button,
  Modal,
  Card,
  ModalDescription,
} from "semantic-ui-react";
import styles from "./Profile.module.css";
import { getUserAppointments } from "../../graphql/query.js";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth.js";
function Appointment({ counsellorData }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(AuthContext);
  const id = user?._id;
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
  //console.log(userAppointments);
  // console.log(counsellorData);

  const appointmentData = [];

  for (let j = 0; j < userAppointments.length; j++) {
    for (let i = 0; i < counsellorData.length; i++) {
      if (userAppointments[j].counsellorID === counsellorData[i]._id) {
        appointmentData.push({
          counsellorName: counsellorData[i].username,
          appointmentDate: userAppointments[j].date.slice(0, 10),
        });
      }
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic>View Appointments</Button>}
    >
      <Modal.Header>View your upcoming appointments here!</Modal.Header>
      <Modal.Content image>
        <Image
          size="medium"
          src="https://avatarfiles.alphacoders.com/837/thumb-83705.png"
          wrapped
        />
        <Modal.Description>
          <Grid padded="vertically">
            <Grid.Row>
              {appointmentData.map((appointment, index) => {
                return (
                  <Grid.Column width={8}>
                    <Card>
                      <Card.Content>
                        <Card.Header content={`Appointment ${index + 1}`} />
                        <Card.Meta
                          content={`Counsellor Name: ${appointment.counsellorName}`}
                        />
                        <Card.Description
                          content={`Appointment Date: ${appointment.appointmentDate}`}
                        />
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Exit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default Appointment;
