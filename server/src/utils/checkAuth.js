import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants.js";
import { AuthenticationError } from "apollo-server-errors";

export const checkAuth = (context) => {
  let user;
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationError("Authorization header must be provided");
  }
  const token = authHeader.split("Bearer ")[1];
  if (!token) {
    throw new AuthenticationError("Authentication must be 'Bearer [token]'");
  }
  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      throw new AuthenticationError("Invalid/Expired Token");
    }
    user = decoded;
  });
  return user;
};
