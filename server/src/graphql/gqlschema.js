import pkg from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { User } from "./typeDefs/User.js";
import { UserResolver } from "./resolvers/User.js";
import { PostResolver } from "./resolvers/Post.js";
import { Post } from "./typeDefs/Post.js";
const { merge } = pkg;

const Query = `
type Query{
    getPosts: [Post]
    getPost(postID: ID!): Post
}`;

const Mutation = `
type Mutation{
    registerUser(registerInput: RegisterInput!): User!
    loginUser(loginInput: LoginInput!): User!
    createPost(createPostInput: CreatePostInput!): Post!
    deletePost(postID: ID!): String!
    createComment(postID: ID!, text: String!): Post!
    deleteComment(postID: ID!, commentID:ID!): Post!
    likePost(postID:ID!): Post!
    
}`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, User, Post],
  resolvers: merge(UserResolver, PostResolver),
});
