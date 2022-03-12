const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Reservation, Restaurant } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email });
    },
    reservations: async (parent, args, context) => {},
    reservation: async (parent, args, context) => {},
    favorites: async (parent, args, context) => {},
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = await signToken(user);
        return { user, token };
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(error.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw error;
      }
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      user.lastLogin = Date.now();
      await user.save();
      return { token, user };
    },
    bookReservation: async (parent, { reservationBook }, context) => {
      if (context.user) {
        const reservation = await Reservation.create({
          reservationBook,
          reservationAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reservation: reservation._id } }
        );

        return reservation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    cancelReservation: async (parent, { reservationId } , context) => {
      if (context.user) {
        const reservation = await Reservation.findOneAndDelete({
          _id: reservationId,
          reservationAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reservations: reservation._id } }
        );

        return reservation;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
