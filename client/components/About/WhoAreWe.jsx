import React from "react";
import { Divider } from "semantic-ui-react";
import styles from "./about.module.css";

function WhoAreWe() {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlImCBRR3R-7BpGJzRbjT5MI9646CEmqwkQA&usqp=CAU" +
          ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <div className={styles.whoStatement}>Who We Are</div>
      <div className={styles.aboutStatement}>
        Reddit for sadness was founded by a group of NTU students
      </div>
      <Divider />
    </div>
  );
}

export default WhoAreWe;
