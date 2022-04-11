import React from "react";
import { Modal, Button, Header, Icon } from "semantic-ui-react";
import styles from "../appointment.module.css";

function SideBarErrorInput() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={styles.errorinput}>
      Error. Please input a location in Singapore.
    </div>
  );
}

export default SideBarErrorInput;
