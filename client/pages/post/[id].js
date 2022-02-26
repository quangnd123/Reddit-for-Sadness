import React, { useContext } from "react";
import { getPost } from "../../graphql/query.js";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Image,
  Icon,
  Form,
} from "semantic-ui-react";
import moment from "moment";
import { LikeButton } from "../../components/LikeButton.js";
import { AuthContext } from "../../context/auth.js";
import DeleteButton from "../../components/DeleteButton.js";
import CreateComment from "../../components/CreateComment.js";
const Post = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  const { loading, data } = useQuery(getPost, {
    variables: { postID: id },
  });
  if (loading) {
    return <h1>Loading....</h1>;
  }
  const { getPost: post } = data;
  const {
    _id,
    title,
    text,
    username,
    userID,
    createdAt,
    updatedAt,
    comments,
    likes,
    count,
  } = post;

  return (
    <Grid>
      <Grid.Column width={2}>
        <Image
          floated="right"
          size="small"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta> {moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>
              <h1>{title}</h1>
            </Card.Description>
            <Card.Description>{text}</Card.Description>
          </Card.Content>
          <hr />
          <Card.Content extra>
            <LikeButton user={user} post={{ _id, likes, count }} />{" "}
            <Button
              as="div"
              labelPosition="right"
              onClick={() => console.log("comment")}
            >
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
            </Button>
            {user && user._id === userID && <DeleteButton postID={_id} />}
          </Card.Content>
        </Card>
        {user && <CreateComment postID={_id} />}
        {comments.map((comment) => (
          <Card fluid key={comment._id}>
            <Card.Content>
              {user && user._id === comment.userID && (
                <DeleteButton postID={_id} commentID={comment._id} />
              )}
              <Card.Header>{comment.username}</Card.Header>
              <Card.Meta> {moment(comment.createdAt).fromNow()}</Card.Meta>
              <Card.Description>{comment.text}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Grid.Column>
    </Grid>
  );
};

export default Post;
