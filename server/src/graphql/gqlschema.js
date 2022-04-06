import pkg from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { User } from "./typeDefs/User.js";
import { UserResolver } from "./resolvers/User.js";
import { PostResolver } from "./resolvers/Post.js";
import { Post } from "./typeDefs/Post.js";
import { Appointment } from "./typeDefs/Appointment.js";
import { AppointmentResolver } from "./resolvers/Appointment.js";
const { merge } = pkg;

const Query = `
type Query{
    getPosts: [Post]
    getPost(postID: ID!): Post
    getUser(userID:ID!):User
    getCounsellors: [User]
    getUserAppointments(userID:ID!): [Appointment]
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
    makeAppointment(appointmentInput: AppointmentInput!): Appointment!
    deleteAppointment(appointmentID: ID!): String!
}`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, User, Post, Appointment],
  resolvers: merge(UserResolver, PostResolver, AppointmentResolver),
});
