import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Button, Dropdown, Form, Header, Modal } from "semantic-ui-react";
import { registerUser } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth.js";
import { useForm } from "../context/hook.js";
import ModalSurvey from "../components/Survey/ModalSurvey.js";
import { urlObjectKeys } from "next/dist/shared/lib/utils";
import Geocode from "react-geocode";

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
  const [inputAddress, setInputAddress] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "User",
    socialIntelligence: 0,
    cognitiveEfficacy: 0,
    selfEsteem: 0,
    emotionalIntelligence: 0,
    happyScale: 0,
    surveyDate: null,
    address: {
      lat: null,
      lng: null,
    },
  });
  const onChange = (e, data) => {
    //console.log(data);
    setValues({ ...values, [data.name]: data.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (
      !values["socialIntelligence"] ||
      !values["cognitiveEfficacy"] ||
      !values["selfEsteem"] ||
      !values["emotionalIntelligence"] ||
      !values["happyScale"]
    ) {
      setServerErrors({ survey: "Please fill in the survey" });
    } else if (!inputAddress) {
      setServerErrors({ address: "Please fill in the address" });
    } else {
      Geocode.setApiKey("AIzaSyDqMrNKSBFKlhgI3m8zzv7Bu627qLimNZ0");
      Geocode.setRegion("sg");
      Geocode.fromAddress(inputAddress).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setValues({ ...values, surveyDate: Date.now() });
          setValues({ ...values, address: { lat: lat, lng: lng } });
          addUser();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

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

  return (
    <div
      style={{
        height: "1000px",
        width: "100%",
        backgroundImage:
          "url(" +
          "https://i0.wp.com/media.wgrz.com/assets/WGRZ/images/c41fabb6-810f-4527-b945-ed6c193eb8b2/c41fabb6-810f-4527-b945-ed6c193eb8b2_1140x641.jpeg" +
          ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100%",
        minWidth: "500px",
      }}
    >
      {/* <img
        src="https://i0.wp.com/media.wgrz.com/assets/WGRZ/images/c41fabb6-810f-4527-b945-ed6c193eb8b2/c41fabb6-810f-4527-b945-ed6c193eb8b2_1140x641.jpeg"
        style={{
          maxHeight: "1000px",
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      /> */}
      <div
        style={{
          position: "relative",
          margin: "auto",
          width: "30%",
          borderStyle: "solid",
          padding: "20px 20px 20px 20px",
          borderRadius: "20px",
          top: "15%",
          backgroundColor: "white",
          minHeight: "300px",
          minWidth: "400px",
        }}
      >
        <Form
          //onSubmit={onSubmit}
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
          <Header as="h3" style={{ color: "#0A2A5A", textAlign: "left" }}>
            Join our community to connect with like-minded people!
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
          <Form.Input
            label="Address"
            placeholder="Address"
            name="address"
            type="text"
            value={inputAddress}
            onChange={(e, data) => setInputAddress(data.value)}
          />
          <Form.Dropdown
            placeholder="choose account type"
            name="accountType"
            onChange={onChange}
            selection
            options={accountTypeOptions}
            value={values.accountType}
          />
          <ModalSurvey
            values={values}
            setValues={setValues}
            onSubmit={onSubmit}
          />
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
