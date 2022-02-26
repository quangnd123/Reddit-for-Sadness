export const Post = `
  scalar Date  
  type Post {
      _id:ID!
      title: String!
      text: String!
      username: String!
      userID:ID!
      createdAt: Date!
      updatedAt: Date!
      comments: [Comment]
      likes:[Like]
      count: Int!
    }
  type Comment{
    _id:ID!
    createdAt: Date!
    userID: ID!
    username: String!
    text: String!
  }    
  type Like{
    userID:ID!
    username: String!
    createdAt: Date!
  }
  input CreatePostInput {
    title: String!
    text: String!
  }
`;
