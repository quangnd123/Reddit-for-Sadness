import React from "react";
import {
  Grid,
  Header,
  Image,
  Button,
  Modal,
  Form,
  Checkbox,
} from "semantic-ui-react";
import styles from "./Profile.module.css";

function EditProfileButton({ text }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button basic>{text}</Button>}
    >
      <Modal.Header>Edit Profile</Modal.Header>
      <div className={styles.editProfileModal}>
        <Form>
          <div className={styles.editProfileModalInput}>
            <Form.Field required>
              <label>Username</label>
              <div className={styles.editProfileModalInputField}>
                <Form.Input placeholder="New Username" width={10} />
              </div>
            </Form.Field>
          </div>
          <div className={styles.editProfileModalInput}>
            <Form.Field required>
              <label>Email</label>
              <div className={styles.editProfileModalInputField}>
                <Form.Input placeholder="New Email" width={10} />
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

export default EditProfileButton;
