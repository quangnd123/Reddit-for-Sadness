import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getPosts } from "../graphql/query.js";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard.js";
import { AuthContext } from "../context/auth.js";
import PostForm from "../components/createPost.js";

export default function Home() {
  const { loading, data } = useQuery(getPosts);

  if (loading) {
    return <h1>loading posts ...</h1>;
  }
  const { user } = useContext(AuthContext);
  const { getPosts: posts } = data;

  return (
    <Grid columns={1}>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {posts &&
          posts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))}
      </Grid.Row>
    </Grid>
  );
}
