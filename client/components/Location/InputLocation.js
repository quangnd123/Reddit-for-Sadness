import React, { useState } from "react";
import {
  Container,
  Header,
  Image,
  Input,
  Label,
  Form,
  Grid,
  GridColumn,
  Message,
} from "semantic-ui-react";
import styles from "./InputLocation.module.css";
import { validLocation } from "./validLocation";

function InputLocation() {
  const [enteredValue, setEnteredValue] = useState("");
  const [isErrorInput, setErrorInput] = useState(true);
  const [errorCount, setErrorCount] = useState(false);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (validLocation.test(enteredValue)) {
      setErrorInput(false);
    } else {
      setErrorCount(true);
      setErrorInput(true);
    }
  };

  const locationInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  return (
    <Container
      textAlign="center"
      style={{ backgroundColor: "#FEFAEC", padding: 50 }}
      fluid
    >
      <Header as="h1">Planning an appointment with the counsellor?</Header>
      {/* <Grid columns="equal" centered>
        <Grid.Row verticalAlign="middle" columns={2}>
          <Grid.Column width={4}>
            <Image
              src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
              bordered
              rounded
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form
              onSubmit={formSubmitHandler}
              error={isErrorInput}
              success={!isErrorInput}
            >
              <Form.Field>
                <Label pointing="below">Please enter a location</Label>
                <Form.Input
                  error={isErrorInput}
                  action={{
                    color: "blue",
                    content: "Find Nearest Counsellors",
                  }}
                  icon="search"
                  iconPosition="left"
                  placeholder="Input Location:"
                  centered
                  onChange={locationInputChangeHandler}
                  required
                />
                {isErrorInput === true && errorCount && (
                  <Message
                    error
                    header="Error"
                    content="Please enter a valid postal code"
                  />
                )}
                {isErrorInput !== true && (
                  <Message
                    success
                    header="Success"
                    content="Finding nearby counsellors"
                  />
                )}
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid> */}
    </Container>
  );
}

export default InputLocation;
