import User from "../../database/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../constants.js";
import { UserInputError } from "apollo-server-errors";
import { ObjectId } from "mongodb";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../../utils/validators.js";

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "6h" }
  );
}

export const UserResolver = {
  Query: {
    async getUser(parent, { userID }, context) {
      const userDB = context.db.collection("User");
      const user = await userDB.findOne({ _id: ObjectId(userID) });
      return user;
    },
    async getCounsellors(parent, args, context) {
      const userDB = context.db.collection("User");
      const counsellors = await userDB.find({ accountType: "COUNSELLOR" });
      return counsellors.toArray();
    },
  },
  Mutation: {
    async registerUser(
      _,
      {
        registerInput: {
          username,
          email,
          password,
          accountType,
          confirmPassword,
          socialIntelligence,
          cognitiveEfficacy,
          selfEsteem,
          emotionalIntelligence,
          happyScale,
          address,
        },
      },
      context
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const userDB = context.db.collection("User");
      const oldUser = await userDB.findOne({ email: email });
      if (oldUser) {
        throw new UserInputError("User email is already taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }
      let encryptedPassword = await argon2.hash(password);
      const newUser = new User({
        username: username,
        email: email,
        password: encryptedPassword,
        accountType: accountType,
        socialIntelligence: socialIntelligence,
        cognitiveEfficacy: cognitiveEfficacy,
        selfEsteem: selfEsteem,
        emotionalIntelligence: emotionalIntelligence,
        happyScale: happyScale,
        address: address,
        surveyDate: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      const { insertedId } = await userDB.insertOne(newUser);
      const user = await userDB.findOne({ _id: ObjectId(insertedId) });
      const token = generateToken(user);
      user["token"] = token;
      return user;
    },
    async loginUser(
      _,
      { loginInput: { email, password, accountType } },
      context
    ) {
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const db = context.db.collection("User");
      const existingUser = await db.findOne({ email: email });
      if (!existingUser) {
        throw new UserInputError("Email does not exist", {
          errors: {
            email: "Email does not exitst",
          },
        });
      }
      let checkPassword = await argon2.verify(existingUser.password, password);
      if (!checkPassword) {
        throw new UserInputError("Wrong password", {
          errors: {
            password: "Wrong password",
          },
        });
      }
      if (accountType != existingUser.accountType) {
        throw new UserInputError("Wrong account type", {
          errors: {
            accountType: "Wrong account type",
          },
        });
      }
      const token = generateToken(existingUser);
      existingUser["token"] = token;
      return existingUser;
    },
  },
};
