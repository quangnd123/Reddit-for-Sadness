import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../context/hook.js";
import { useMutation } from "@apollo/react-hooks";
import { createPost } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { getPosts } from "../graphql/query.js";
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
      <Form onSubmit={onSubmit}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="title"
            name="title"
            onChange={onChange}
            value={values.title}
          />
          <Form.Input placeholder="text" name="text" onChange={onChange} />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
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

export default PostForm;
