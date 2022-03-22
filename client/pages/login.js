import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Button, Dropdown, Form, Grid } from "semantic-ui-react";
import { loginUser } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth.js";
import { useForm } from "../context/hook.js";
import LoginButtons from "../components/Login/LoginImage";
import LoginImage from "../components/Login/LoginImage";

const login = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (context.user) {
    router.push("/");
  }

  const [serverErrors, setServerErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
    accountType: "User",
  });

  const accountTypeOptions = [
    { text: "User", value: "User" },
    { text: "Counsellor", value: "Counsellor" },
  ];

  const [login, { loading }] = useMutation(loginUser, {
    update(proxy, result) {
      context.login(result.data.loginUser);
      router.push("/");
    },
    onError(err) {
      setServerErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    login();
  }

  return (
    <div>
      <Grid centered verticalAlign="middle" width={6}>
        <Grid.Row centered columns={2}>
          <Grid.Column width={6} centered>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 style={{ color: "orange" }}>Welcome back!</h1>
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
              <h2>Login</h2>
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                type="text"
                value={values.email}
                onChange={onChange}
                width={10}
              />
              <Form.Input
                label="Password"
                placeholder="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={onChange}
                width={10}
              />
              <Form.Dropdown
                placeholder="choose account type"
                name="accountType"
                onChange={onChange}
                selection
                options={accountTypeOptions}
                value={values.accountType}
                width={10}
              />
              <Button type="submit" primary>
                Submit
              </Button>
            </Form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Grid.Column>
          {Object.keys(serverErrors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(serverErrors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
          <Grid.Column width={8}>
            <LoginImage />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default login;
