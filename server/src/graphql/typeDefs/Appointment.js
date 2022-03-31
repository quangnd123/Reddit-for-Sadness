export const Appointment = `
    type Appointment{
        _id:ID!
        userID: ID!
        counsellorID: ID!
        address: Address!
        date: Date!
    }
    input AppointmentInput{
        userID: ID!
        counsellorID: ID!
        address: InputAddress!
        date: Date!
    }
`;
