import pkg from "mongoose";
import { ObjectId } from "mongodb";
const { model, Schema } = pkg;
const appointmentSchema = new Schema({
  userID: { type: ObjectId },
  counsellorID: { type: ObjectId },
  address: {
    lat: { type: String },
    lng: { type: String },
  },
  date: { type: Date },
});

export default model("Appointment", appointmentSchema);
