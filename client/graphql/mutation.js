import { gql } from "@apollo/react-hooks";

export const deleteAppointment = gql`
  mutation deleteAppointment($appointmentID: ID!) {
    deleteAppointment(appointmentID: $appointmentID)
  }
`;
export const makeAppointment = gql`
  mutation makeAppointment(
    $userID: ID!
    $counsellorID: ID!
    $address: InputAddress!
    $date: Date!
  ) {
    makeAppointment(
      appointmentInput: {
        userID: $userID
        counsellorID: $counsellorID
        address: $address
        date: $date
      }
    ) {
      _id
      userID
      counsellorID
      address {
        lat
        lng
      }
      date
    }
  }
`;

export const registerUser = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $accountType: String!
    $confirmPassword: String!
    $socialIntelligence: String!
    $cognitiveEfficacy: String!
    $selfEsteem: String!
    $emotionalIntelligence: String!
    $happyScale: String!
    $address: InputAddress!
  ) {
    registerUser(
      registerInput: {
        username: $username
        email: $email
        password: $password
        accountType: $accountType
        confirmPassword: $confirmPassword
        socialIntelligence: $socialIntelligence
        cognitiveEfficacy: $cognitiveEfficacy
        selfEsteem: $selfEsteem
        emotionalIntelligence: $emotionalIntelligence
        happyScale: $happyScale
        address: $address
      }
    ) {
      _id
      accountType
      username
      email
      token
      createdAt
      updatedAt
      socialIntelligence
      cognitiveEfficacy
      selfEsteem
      emotionalIntelligence
      happyScale
      address {
        lat
        lng
      }
      surveyDate
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
      socialIntelligence
      cognitiveEfficacy
      selfEsteem
      emotionalIntelligence
      happyScale
      address {
        lat
        lng
      }
      surveyDate
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
