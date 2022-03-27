import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Button, Dropdown, Form } from "semantic-ui-react";
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
      context.login(result.data.registerUser);
      console.log(result);
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
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          Submit
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
  );
};

export default register;
