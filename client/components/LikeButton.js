import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import { likePost } from "../graphql/mutation.js";
import { Button, Icon, Label } from "semantic-ui-react";

export const LikeButton = ({ user, post: { _id, count, likes } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes && likes.find((like) => like.userID === user._id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [like] = useMutation(likePost, {
    variables: { postID: _id },
    onError(err) {
      console.log(JSON.stringify(err));
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Link href="/login" passHref>
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    </Link>
  );
  return (
    <Button as="div" labelPosition="right" onClick={like}>
      {likeButton}
      {/* <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup> */}
      <Label basic color="teal" pointing="left">
        {count}
      </Label>
    </Button>
  );
};
