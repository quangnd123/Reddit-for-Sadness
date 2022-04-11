import React, { useContext, useEffect, useState } from "react";
import { Card, Image, Label, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import Link from "next/link";
import { AuthContext } from "../context/auth";
import { LikeButton } from "./LikeButton.js";
import DeleteButton from "./DeleteButton.js";
import { useQuery } from "@apollo/react-hooks";
import { getCounsellors } from "../graphql/query.js";

const PostCard = ({
  post: { title, text, _id, username, userID, likes, count },
}) => {
  const { user } = useContext(AuthContext);
  if (user) {
    const userid = user._id;
  }

  const { loading, data, error } = useQuery(getCounsellors);
  if (loading) {
    return <h1>Query Loading ...</h1>;
  }
  if (error) {
    return <h1>Query Error ...</h1>;
  }
  const counsellors = data.getCounsellors;
  let isCounsellor = false;

  for (let i = 0; i < counsellors.length; i++) {
    if (userid === counsellors[i]._id) {
      console.log("LOLLLLL");
      isCounsellor = true;
    }
  }

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
          {user && (user._id === userID || isCounsellor) && (
            <DeleteButton postID={_id} />
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
