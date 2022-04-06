import React from "react";
import { Grid, Header, Image, Button } from "semantic-ui-react";
import styles from "./Profile.module.css";
import { MdModeEditOutline } from "react-icons/fa";

function ViewProfile({ id, email, username }) {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column className={styles.change} width="4">
            <div className={styles.links}>
              <a href="" className={styles.links}>
                Edit Profile
              </a>
              <a href="" className={styles.links}>
                Change Password
              </a>
              <a href="" className={styles.links}>
                View/Change Appointments
              </a>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.profile} width="4">
            <Image
              size="small"
              centered
              src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
            />
            <br />
            <Button color="orange" fluid>
              Edit Profile Picture
            </Button>
            <br />
            <div>
              Username: {username}
              <Button floated="right" size="mini">
                EDIT USERNAME
              </Button>
            </div>
            <br />
            <div>
              Email: {email}
              <Button floated="right" size="mini">
                EDIT EMAIL
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ViewProfile;
