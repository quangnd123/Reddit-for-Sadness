import React from "react";
import styles from "./about.module.css";
import { Divider, Grid, Header } from "semantic-ui-react";

function Stats() {
  return (
    <div>
      <h2 className={styles.stats}>Mental Health Savers by numbers</h2>
      <Divider />
      <Grid columns={3} divided>
        <Grid.Row className={styles.rowStats}>
          <Grid.Column className={styles.gridStats}>
            <div className={styles.totalStats}>
              <Header as="h1" style={{ marginBottom: "-5%" }}>
                50M
              </Header>
              <Header as="h3">Number of Posts and Comments</Header>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.gridStats}>
            <div className={styles.totalStats}>
              <Header as="h1" style={{ marginBottom: "-5%" }}>
                50M
              </Header>
              <Header as="h3">Number of Users</Header>
            </div>
          </Grid.Column>
          <Grid.Column className={styles.gridStats}>
            <div className={styles.totalStats}>
              <Header as="h1" style={{ marginBottom: "-5%" }}>
                50M
              </Header>
              <Header as="h3">Number of Counsellors</Header>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Stats;
