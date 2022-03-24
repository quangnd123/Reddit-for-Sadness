import React from "react";
import { Divider } from "semantic-ui-react";
import styles from "./about.module.css";

function WhoAreWe() {
  return (
    <>
      <div className={styles.whoStatement}>Who We Are</div>
      <div className={styles.aboutStatement}>
        Reddit for sadness was founded by a group of NTU students
      </div>
      <Divider />
    </>
  );
}

export default WhoAreWe;
