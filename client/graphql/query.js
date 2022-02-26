import { gql } from "@apollo/react-hooks";
export const getPosts = gql`
  {
    getPosts {
      _id
      title
      text
      username
      userID
      createdAt
      updatedAt
      comments {
        _id
        createdAt
        userID
        username
        text
      }
      likes {
        userID
        username
        createdAt
      }
      count
    }
  }
`;

export const getPost = gql`
  query ($postID: ID!) {
    getPost(postID: $postID) {
      _id
      title
      text
      username
      userID
      createdAt
      updatedAt
      comments {
        _id
        createdAt
        userID
        username
        text
      }
      likes {
        userID
        username
        createdAt
      }
      count
    }
  }
`;
