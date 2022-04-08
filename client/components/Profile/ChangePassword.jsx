import React from "react";
import { Grid, Header, Image, Button, Modal, Form } from "semantic-ui-react";
import styles from "./Profile.module.css";

function ChangePassword() {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic>Change Password</Button>}
    >
      <Modal.Header>Change Password</Modal.Header>
      <div className={styles.editProfileModal}>
        <Form>
          <div className={styles.editProfileModalInput}>
            <Form.Field required>
              <label>Enter Old Password</label>
              <div className={styles.editProfileModalInputField}>
                <Form.Input
                  placeholder="Old Password"
                  width={10}
                  type="password"
                />
              </div>
            </Form.Field>
          </div>
          <div className={styles.editProfileModalInput}>
            <Form.Field required>
              <label>Enter New Password</label>
              <div className={styles.editProfileModalInputField}>
                <Form.Input
                  placeholder="New Password"
                  width={10}
                  type="password"
                />
              </div>
            </Form.Field>
          </div>
          <div className={styles.editProfileModalInput}>
            <Form.Field required>
              <label>Confirm New Password</label>
              <div className={styles.editProfileModalInputField}>
                <Form.Input
                  placeholder="Confirm Password"
                  width={10}
                  type="password"
                />
              </div>
            </Form.Field>
          </div>
        </Form>
      </div>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ChangePassword;
