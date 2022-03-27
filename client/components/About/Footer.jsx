import React from "react";
import { Divider, Grid, Header } from "semantic-ui-react";
import styles from "./about.module.css";

function Footer() {
  return (
    <>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column className={styles.gridStats}>
            <Header as="h3">Policy</Header>
            <Header as="h5">User Agreement</Header>
            <Header as="h5">Privacy Policy</Header>
          </Grid.Column>
          <Grid.Column className={styles.gridStats}>
            <Header as="h3">Contact Us</Header>
            <Header as="h5">Email</Header>
            <Header as="h5">Phone Number</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Footer;
