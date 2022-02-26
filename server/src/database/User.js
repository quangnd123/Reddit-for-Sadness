import pkg from "mongoose";
const { model, Schema } = pkg;
const userSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  accountType: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export default model("User", userSchema);
