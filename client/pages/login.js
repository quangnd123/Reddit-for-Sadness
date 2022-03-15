  import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { loginUser } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth.js";
import { useForm } from "../context/hook.js";

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
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
      {Object.keys(serverErrors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(serverErrors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default login;
