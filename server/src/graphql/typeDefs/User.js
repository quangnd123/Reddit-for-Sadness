export const User = `
  type User {
    _id:ID!
    accountType: String!
    username: String!
    email: String!
    password: String!
    token: String
    socialIntelligence:Int
    cognitiveEfficacy: Int
    selfEsteem: Int
    emotionalIntelligence: Int 
    happyScale: Int
    address: Address
    createdAt: Date!
    updatedAt: Date!
    surveyDate:Date
  }
  input InputAddress{
    lat: String
    lng: String
  }
  type Address{
    lat: String
    lng: String
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
    socialIntelligence:Int
    cognitiveEfficacy: Int
    selfEsteem: Int
    emotionalIntelligence: Int 
    happyScale: Int
    address: InputAddress
  }

  input LoginInput {
    email: String!
    password: String!
    accountType: String!
  }
`;
