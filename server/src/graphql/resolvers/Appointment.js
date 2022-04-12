import Appointment from "../../database/Appointment.js";
import { UserInputError } from "apollo-server-errors";
import { ObjectId } from "mongodb";

export const AppointmentResolver = {
  Query: {
    async getUserAppointments(parent, { userID }, context) {
      const appointmentDB = context.db.collection("Appointment");
      const appointments = await appointmentDB
        .find({ userID: ObjectId(userID) })
        .sort({ date: 1 });
      return appointments.toArray();
    },
  },
  Mutation: {
    async deleteAppointment(parent, { appointmentID }, context) {
      const appointmentDB = context.db.collection("Appointment");
      await appointmentDB.deleteOne({ _id: ObjectId(appointmentID) });
      return "Appointment deleted successfully";
    },
    async makeAppointment(
      parent,
      { appointmentInput: { userID, counsellorID, address, date } },
      context
    ) {
      const appointmentDB = context.db.collection("Appointment");
      console.log(date);
      const existingAppointmentUser = await appointmentDB.findOne({
        userID: ObjectId(userID),
        date: date,
      });
      console.log(existingAppointmentUser);
      if (existingAppointmentUser) {
        throw new UserInputError("You already have appointment on this day", {
          errors: {
            message: "You already have appointment on this day",
          },
        });
      }

      const newAppointment = new Appointment({
        userID: userID,
        counsellorID: counsellorID,
        address: address,
        date: date,
      });
      const { insertedId } = await appointmentDB.insertOne(newAppointment);
      const appointment = await appointmentDB.findOne({
        _id: ObjectId(insertedId),
      });
      console.log(appointment);
      return appointment;
    },
  },
};
