import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import styles from "./ModalSurvey.module.css";
import surveyQuestions from "./SurveyQuestions";

function Survey({ setValues, values }) {
  return (
    <>
      {surveyQuestions.map((question, index) => {
        const [radio, setRadio] = useState();
        return (
          <div>
            <label>{question.question}</label>
            <Form.Group inline>
              {[...Array(10)].map((x, i) => (
                <Form.Radio
                  label={i + 1}
                  name={question.id}
                  value={i + 1}
                  checked={radio === i + 1 || values[question.id] === i + 1}
                  onChange={(e, data) => {
                    setRadio(data.value);
                    setValues({ ...values, [data.name]: String(data.value) });
                  }}
                />
              ))}
            </Form.Group>
          </div>
        );
      })}
    </>
  );
}

export default Survey;
