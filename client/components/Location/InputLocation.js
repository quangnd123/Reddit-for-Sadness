import React from "react";
import {
  Container,
  Header,
  Image,
  Input,
  Label,
  Form,
  Grid,
  GridColumn,
} from "semantic-ui-react";

function InputLocation() {
  return (
    <Container
      textAlign="center"
      style={{ backgroundColor: "#FEFAEC", padding: 50 }}
      fluid
    >
      <Header as="h1">Planning an appointment with the counsellor?</Header>
      <Grid columns="equal" centered>
        <Grid.Row verticalAlign="middle" columns={2}>
          <Grid.Column width={4}>
            <Image
              src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
              bordered
              rounded
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form>
              <Form.Field>
                <Label pointing="below">Please enter a location</Label>
                <Form.Input
                  action={{
                    color: "blue",
                    content: "Find Nearest Counsellors",
                  }}
                  icon="search"
                  iconPosition="left"
                  placeholder="Input Location:"
                  centered
                />
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default InputLocation;
