import pkg from "mongoose";

const { model, Schema } = pkg;
const userSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  accountType: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  address: {
    lat: { type: String },
    lng: { type: String },
  },
  socialIntelligence: { type: String },
  cognitiveEfficacy: { type: String },
  selfEsteem: { type: String },
  emotionalIntelligence: { type: String },
  happyScale: { type: String },
  surveyDate: { type: Date },
});

export default model("User", userSchema);
