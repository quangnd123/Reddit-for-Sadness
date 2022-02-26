import { gql } from "@apollo/react-hooks";

export const registerUser = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $accountType: String!
    $confirmPassword: String!
  ) {
    registerUser(
      registerInput: {
        username: $username
        email: $email
        password: $password
        accountType: $accountType
        confirmPassword: $confirmPassword
      }
    ) {
      _id
      accountType
      username
      email
      token
      createdAt
      updatedAt
    }
  }
`;

export const loginUser = gql`
  mutation loginUser(
    $email: String!
    $password: String!
    $accountType: String!
  ) {
    loginUser(
      loginInput: {
        email: $email
        password: $password
        accountType: $accountType
      }
    ) {
      _id
      accountType
      username
      email
      token
      createdAt
      updatedAt
    }
  }
`;

export const createPost = gql`
  mutation createPost($title: String!, $text: String!) {
    createPost(createPostInput: { title: $title, text: $text }) {
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

export const likePost = gql`
  mutation likePost($postID: ID!) {
    likePost(postID: $postID) {
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

export const deletePost = gql`
  mutation deletePost($postID: ID!) {
    deletePost(postID: $postID)
  }
`;

export const deleteComment = gql`
  mutation deleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID) {
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

export const createComment = gql`
  mutation createComment($postID: ID!, $text: String!) {
    createComment(postID: $postID, text: $text) {
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
