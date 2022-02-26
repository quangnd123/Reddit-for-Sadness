import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { deletePost, deleteComment } from "../graphql/mutation.js";
import { useRouter } from "next/router";
import { getPosts } from "../graphql/query.js";
const DeleteButton = ({ postID: _id, commentID: commentID }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();
  const mutation = commentID ? deleteComment : deletePost;
  const [deleteMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentID) {
        const data = proxy.readQuery({
          query: getPosts,
        });
        data.getPosts = data.getPosts.filter((post) => post._id !== _id);
        proxy.writeQuery({ query: getPosts, data });
        router.push("/");
      }
    },
    variables: { postID: _id, commentID: commentID },
  });
  return (
    <div>
      <Button color="red" floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMutation}
      />
    </div>
  );
};

export default DeleteButton;
