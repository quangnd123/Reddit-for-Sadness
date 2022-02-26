import React, { useState } from "react";
import { Card, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { createComment } from "../graphql/mutation.js";

const CreateComment = ({ postID: _id }) => {
  const [comment, setComment] = useState("");
  const [submitComment] = useMutation(createComment, {
    update() {
      setComment("");
    },
    variables: {
      postID: _id,
      text: comment,
    },
  });

  return (
    <Card fluid>
      <p>Post a comment</p>
      <Card.Content>
        <Form>
          <div className="ui action input fluid">
            <input
              type="text"
              placeholder="comment..."
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="ui button"
              disabled={comment.trim() === ""}
              onClick={submitComment}
            >
              Subbmit
            </button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default CreateComment;
