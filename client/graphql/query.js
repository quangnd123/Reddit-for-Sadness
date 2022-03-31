import { gql } from "@apollo/react-hooks";
export const getUser = gql`
  query ($userID: ID!) {
    getUser(userID: $userID) {
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
export const getUserAppointments = gql`
  query ($userID: ID!) {
    getUserAppointments(userID: $userID) {
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
export const getCounsellors = gql`
  {
    getCounsellors {
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
