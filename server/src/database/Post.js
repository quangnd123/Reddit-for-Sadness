import { ObjectId } from "mongodb";
import pkg from "mongoose";
const { model, Schema } = pkg;
const postSchema = new Schema({
  title: { type: String },
  text: { type: String },
  userID: { type: ObjectId, ref: "User" },
  username: { type: String },
  comments: [
    {
      _id: { type: ObjectId },
      userID: { type: ObjectId },
      username: { type: String },
      text: { type: String },
      createdAt: { type: Date },
    },
  ],
  likes: [
    {
      userID: { type: ObjectId },
      username: { type: String },
      createdAt: { type: Date },
    },
  ],
  count: { type: Number },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export default model("Post", postSchema);
