import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Button, Dropdown, Form, Header } from "semantic-ui-react";
import { registerUser } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth.js";
import { useForm } from "../context/hook.js";

const register = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  if (context.user) {
    router.push("/");
  }

  const [serverErrors, setServerErrors] = useState({});

  const accountTypeOptions = [
    { text: "User", value: "User" },
    { text: "Counsellor", value: "Counsellor" },
  ];

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "User",
  });

  const [addUser, { loading }] = useMutation(registerUser, {
    update(proxy, result) {
      context.login(result.data.loginUser);
      router.push("/");
    },
    onError(err) {
      setServerErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    addUser();
  }

  return (
    <div>
      <img
        src="https://i0.wp.com/media.wgrz.com/assets/WGRZ/images/c41fabb6-810f-4527-b945-ed6c193eb8b2/c41fabb6-810f-4527-b945-ed6c193eb8b2_1140x641.jpeg"
        style={{
          maxHeight: "654px",
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          margin: "auto",
          width: "30%",
          borderStyle: "solid",
          padding: "20px 20px 20px 20px",
          borderRadius: "20px",
          top: "15%",
          left: "35%",
          backgroundColor: "white",
        }}
      >
        <Form
          onSubmit={onSubmit}
          className={loading ? "loading" : ""}
          style={{ margin: "auto", width: "100%", textAlign: "center" }}
        >
          <h1
            style={{
              color: "rgb(0,0,0)",
              margin: "auto",
              width: "100%",
              textAlign: "center",
            }}
          >
            Join Our Website!
          </h1>
          <Header as="h3" style={{ color: "#0A2A5A" }}>
            Join our community to connect with likeminded people!
          </Header>
          <Form.Input
            label="Username"
            placeholder="Username"
            name="username"
            type="text"
            value={values.username}
            onChange={onChange}
          />
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            type="text"
            value={values.email}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={onChange}
          />
          <Form.Input
            label="ConfirmPassword"
            placeholder="ConfirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={onChange}
          />
          <Form.Dropdown
            placeholder="choose account type"
            name="accountType"
            onChange={onChange}
            selection
            options={accountTypeOptions}
            value={values.accountType}
          />
          <Button type="submit" primary>
            Register Account
          </Button>
        </Form>
        {serverErrors !== null && Object.keys(serverErrors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {serverErrors !== null &&
                Object.values(serverErrors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default register;
