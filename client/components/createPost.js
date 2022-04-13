import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../context/hook.js";
import { useMutation } from "@apollo/react-hooks";
import { createPost } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { getPosts } from "../graphql/query.js";
import styles from "./createPost.module.css";

const PostForm = () => {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState({});
  const { values, onSubmit, onChange } = useForm(createPostCallback, {
    title: "",
    text: "",
  });
  const [create, {}] = useMutation(createPost, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: getPosts,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: getPosts, data });
      router.push("/");
    },

    onError(err) {
      //console.log(JSON.stringify(err, null, 2));
      //console.log(err.graphQLErrors[0].extensions.errors);
      setServerErrors(err.graphQLErrors[0].extensions.errors);
    },
  });
  function createPostCallback() {
    create();
  }
  return (
    <div>
      <div className={styles.form}>
        <Form onSubmit={onSubmit}>
          <h2 style={{ textAlign: "center" }}>Create a Post</h2>
          <Form.Field>
            <Form.Input
              placeholder="Title"
              name="title"
              onChange={onChange}
              value={values.title}
              className={styles.formInput}
            />
            <Form.Input
              placeholder="Text"
              name="text"
              onChange={onChange}
              className={styles.formInput}
            />
            <Button
              type="submit"
              color="teal"
              className={styles.formInput}
              fluid
            >
              Submit
            </Button>
          </Form.Field>
        </Form>
      </div>
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

export default PostForm;
