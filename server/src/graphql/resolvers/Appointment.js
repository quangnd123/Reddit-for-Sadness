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
      var startDate = date;
      var endDate = date;
      startDate.setHours(startDate.getHours() - 1);
      endDate.setHours(endDate.getHours() + 1);
      const existingAppointmentUser = await appointmentDB.findOne({
        userID: ObjectId(userID),
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      if (existingAppointmentUser) {
        throw new UserInputError(
          "You have another appointment which causes clash",
          {
            errors: {
              email: "Schedule clash",
            },
          }
        );
      }

      const existingAppointmentCounsellor = await appointmentDB.findOne({
        counsellorID: ObjectId(counsellorID),
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      if (existingAppointmentCounsellor) {
        throw new UserInputError(
          "The cousellor have another appointment which causes clash",
          {
            errors: {
              email: "Schedule clash",
            },
          }
        );
      }

      const newAppointment = new Appointment({
        userID: userID,
        counsellorID: counsellorID,
        address: address,
        date: Date.now(),
      });
      const { insertedId } = await appointmentDB.insertOne(newAppointment);
      const appointment = await appointmentDB.findOne({
        _id: ObjectId(insertedId),
      });
      return appointment;
    },
  },
};
