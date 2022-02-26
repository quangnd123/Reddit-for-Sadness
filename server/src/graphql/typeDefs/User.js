export const User = `
  type User {
    _id:ID!
    accountType: String!
    username: String!
    email: String!
    password: String!
    token: String!
    createdAt: Date!
    updatedAt: Date!
  }

  enum AccountType{
    USER
    COUNSELLOR
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    accountType: String!
    confirmPassword:String!
  }

  input LoginInput {
    email: String!
    password: String!
    accountType: String!
  }
`;
