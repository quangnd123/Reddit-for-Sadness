import React, { useContext, useEffect, useState } from "react";
import { Card, Image, Label, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import Link from "next/link";
import { AuthContext } from "../context/auth";
import { LikeButton } from "./LikeButton.js";
import DeleteButton from "./DeleteButton.js";
const PostCard = ({
  post: { title, text, _id, username, userID, likes, count },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{username}</Card.Meta>
        <Card.Description>{text}</Card.Description>
        {/* <Card.Description>{moment(createdAt).fromNow}</Card.Description> */}
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton user={user} post={{ _id, likes, count }} />
          <Link href={`/post/${_id}`} passHref>
            <Button labelPosition="right">
              <Button basic color="blue">
                <Icon name="comments" />
                Comment
              </Button>
            </Button>
          </Link>
          {user && user._id === userID && <DeleteButton postID={_id} />}
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
