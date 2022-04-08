import React from "react";
import { Grid, Header, Image, Button, Modal } from "semantic-ui-react";
import styles from "./Profile.module.css";
import { MdModeEditOutline } from "react-icons/fa";
import EditProfileButton from "./EditProfileButton";
import ChangePassword from "./ChangePassword";
import Appointment from "./Appointment";

function ViewProfile({
  id,
  email,
  username,
  createdAt,
  accountType,
  surveyDate,
  happyscale,
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column className={styles.change} width="4">
            <div className={styles.links}>
              <EditProfileButton text={"Edit Profile"} />
              <br />
              <ChangePassword text={"Change Password"} />
              <br />
              <Appointment text={"View/Change Appointments"} />
            </div>
          </Grid.Column>
          <Grid.Column className={styles.profile} width="6">
            <div className={styles.image}>
              <Image
                size="small"
                centered
                src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
              />
            </div>
            <div className={styles.data}>
              Account Type: <span className={styles.info}>{accountType}</span>
            </div>
            <div className={styles.data}>
              Username: <span className={styles.info}>{username}</span>
            </div>
            <div className={styles.data}>
              Email: <span className={styles.info}>{email}</span>
            </div>
            <div className={styles.data}>
              Account Created At:
              <span className={styles.info}> {createdAt}</span>
            </div>
            <div className={styles.data}>
              Survey Date: <span className={styles.info}>{surveyDate}</span>
            </div>
            <div className={styles.data}>
              Overall Emotional Health:
              <span className={styles.info}> {happyscale}</span>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ViewProfile;