import React from "react";
import { Form } from "semantic-ui-react";
import styles from "./ModalSurvey.module.css";
import surveyQuestions from "./SurveyQuestions";

function Survey({ question, label }) {
  return (
    <>
      {surveyQuestions.map((question, index) => {
        return (
          <Form.Field>
            <label className={styles.label}>{question.question}</label>
            <input
              type="radio"
              value="1"
              name={question.id}
              className={styles.radio}
            />
            1
            <input
              type="radio"
              value="2"
              name={question.id}
              className={styles.radio}
            />
            2
            <input
              type="radio"
              value="3"
              name={question.id}
              className={styles.radio}
            />
            3
            <input
              type="radio"
              value="4"
              name={question.id}
              className={styles.radio}
            />
            4
            <input
              type="radio"
              value="5"
              name={question.id}
              className={styles.radio}
            />
            5
            <input
              type="radio"
              value="6"
              name={question.id}
              className={styles.radio}
            />
            6
            <input
              type="radio"
              value="7"
              name={question.id}
              className={styles.radio}
            />
            7
            <input
              type="radio"
              value="8"
              name={question.id}
              className={styles.radio}
            />
            8
            <input
              type="radio"
              value="9"
              name={question.id}
              className={styles.radio}
            />
            9
          </Form.Field>
        );
      })}
    </>
  );
}

export default Survey;
