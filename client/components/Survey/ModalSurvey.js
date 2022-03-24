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
          <Form.Field>
            <label className={styles.label}>Are you gay?</label>
            <input type="radio" value="1" name="Q1" className={styles.radio} />
            1
            <input type="radio" value="2" name="Q1" className={styles.radio} />
            2
            <input type="radio" value="3" name="Q1" className={styles.radio} />
            3
            <input type="radio" value="4" name="Q1" className={styles.radio} />
            4
            <input type="radio" value="5" name="Q1" className={styles.radio} />
            5
            <input type="radio" value="6" name="Q1" className={styles.radio} />
            6
            <input type="radio" value="7" name="Q1" className={styles.radio} />
            7
            <input type="radio" value="8" name="Q1" className={styles.radio} />
            8
            <input type="radio" value="9" name="Q1" className={styles.radio} />9
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Are you gay?</label>
            <input type="radio" value="1" name="Q2" className={styles.radio} />
            1
            <input type="radio" value="2" name="Q2" className={styles.radio} />
            2
            <input type="radio" value="3" name="Q2" className={styles.radio} />
            3
            <input type="radio" value="4" name="Q2" className={styles.radio} />
            4
            <input type="radio" value="5" name="Q2" className={styles.radio} />
            5
            <input type="radio" value="6" name="Q2" className={styles.radio} />
            6
            <input type="radio" value="7" name="Q2" className={styles.radio} />
            7
            <input type="radio" value="8" name="Q2" className={styles.radio} />
            8
            <input type="radio" value="9" name="Q2" className={styles.radio} />9
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Are you gay?</label>
            <input type="radio" value="1" name="Q3" className={styles.radio} />
            1
            <input type="radio" value="2" name="Q3" className={styles.radio} />
            2
            <input type="radio" value="3" name="Q3" className={styles.radio} />
            3
            <input type="radio" value="4" name="Q3" className={styles.radio} />
            4
            <input type="radio" value="5" name="Q3" className={styles.radio} />
            5
            <input type="radio" value="6" name="Q3" className={styles.radio} />
            6
            <input type="radio" value="7" name="Q3" className={styles.radio} />
            7
            <input type="radio" value="8" name="Q3" className={styles.radio} />
            8
            <input type="radio" value="9" name="Q3" className={styles.radio} />9
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Are you gay?</label>
            <input type="radio" value="1" name="Q4" className={styles.radio} />
            1
            <input type="radio" value="2" name="Q4" className={styles.radio} />
            2
            <input type="radio" value="3" name="Q4" className={styles.radio} />
            3
            <input type="radio" value="4" name="Q4" className={styles.radio} />
            4
            <input type="radio" value="5" name="Q4" className={styles.radio} />
            5
            <input type="radio" value="6" name="Q4" className={styles.radio} />
            6
            <input type="radio" value="7" name="Q4" className={styles.radio} />
            7
            <input type="radio" value="8" name="Q4" className={styles.radio} />
            8
            <input type="radio" value="9" name="Q4" className={styles.radio} />9
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Are you gay?</label>
            <input type="radio" value="1" name="Q5" className={styles.radio} />
            1
            <input type="radio" value="2" name="Q5" className={styles.radio} />
            2
            <input type="radio" value="3" name="Q5" className={styles.radio} />
            3
            <input type="radio" value="4" name="Q5" className={styles.radio} />
            4
            <input type="radio" value="5" name="Q5" className={styles.radio} />
            5
            <input type="radio" value="6" name="Q5" className={styles.radio} />
            6
            <input type="radio" value="7" name="Q5" className={styles.radio} />
            7
            <input type="radio" value="8" name="Q5" className={styles.radio} />
            8
            <input type="radio" value="9" name="Q5" className={styles.radio} />9
          </Form.Field>
          <Form.Field>
            <label className={styles.label}>Are you gay?</label>
            <input type="radio" value="1" name="Q6" className={styles.radio} />
            1
            <input type="radio" value="2" name="Q6" className={styles.radio} />
            2
            <input type="radio" value="3" name="Q6" className={styles.radio} />
            3
            <input type="radio" value="4" name="Q6" className={styles.radio} />
            4
            <input type="radio" value="5" name="Q6" className={styles.radio} />
            5
            <input type="radio" value="6" name="Q6" className={styles.radio} />
            6
            <input type="radio" value="7" name="Q6" className={styles.radio} />
            7
            <input type="radio" value="8" name="Q6" className={styles.radio} />
            8
            <input type="radio" value="9" name="Q6" className={styles.radio} />9
          </Form.Field>
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
