import {
  Button,
  Dropdown,
  Form,
  Header,
  Modal,
  Radio,
} from "semantic-ui-react";
import styles from "./ModalSurvey.module.css";
import React, { useState, useContext } from "react";
import Survey from "./Survey";

function ModalSurvey() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      trigger={<Button>Show Modal</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header className={styles.header}>
        Mental Health Survey
      </Modal.Header>
      <Modal.Content>
        <Header as="h2">We would like to get to know you!</Header>
        <Form>
          <Survey />
          <div className={styles.submit}>
            <Modal.Actions>
              <Button
                color="black"
                onClick={() => setOpen(false)}
                type="submit"
                primary
              >
                Submit
              </Button>
            </Modal.Actions>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default ModalSurvey;
