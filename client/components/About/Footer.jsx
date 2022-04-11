import React from "react";
import { Divider, Grid, Header, Icon } from "semantic-ui-react";
import styles from "./about.module.css";

function Footer() {
  return (
    <>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column className={styles.gridStats}>
            <Header as="h3">Policy</Header>
            <Header as="h5">
              <a href="https://www.google.com">
                <Icon name="book" />
                User Agreement
              </a>
            </Header>
            <Header as="h5">
              <a href="https://www.google.com">
                <Icon name="privacy" />
                Privacy Policy
              </a>
            </Header>
          </Grid.Column>
          <Grid.Column className={styles.gridStats}>
            <Header as="h3">Contact Us</Header>
            <Header as="h5">
              <Icon name="mail" />
              mentalhelp@gmail.com
            </Header>
            <Header as="h5">
              <Icon name="phone" />
              +65 62353535
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Footer;
