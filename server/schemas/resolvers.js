const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { resolveReadonlyArrayThunk } = require("graphql");
const { User, Reservation, Restaurant } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");
const { Types } = require("mongoose");

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email }).populate("favorites").populate("reservations");
    },
    all_reservations: async (parent, args, context) => {
      return Reservation.find({}).populate("restaurant");
    },
    reservation: async (parent, args, context) => {
      return Reservation.findOne({ _id }).populate("restaurant");
    },
    restaurants: async (parent, args, context) => {
      return await Restaurant.find({}).populate("reservations");
    }
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
    addFavorite: async (parent, { restaurantId }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { favorites: restaurantId } }
        ).populate("favorites");
      }
      throw new AuthenticationError(
        "You need to be logged in to add a favorite"
      );
    },
    removeFavorite: async (parent, { restaurantId }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: restaurantId } }
        ).populate("favorites");
      }
      throw new AuthenticationError(
        "You need to be logged in to remove a favorite"
      );
    },
    createReservation: async (
      parent,
      { time, location, party_size, restaurantId },
      context
    ) => {
      if (context.user) {
        const newReservation = await Reservation.create({
          time: time,
          location: location,
          party_size: party_size,
        });

        const updatedRestaurant = await Restaurant.findOneAndUpdate(
          { _id: restaurantId },
          { $push: { reservations: newReservation._id } },
          { new: true }
        ).populate("reservations");

        return { updatedRestaurant };
      }
      throw new AuthenticationError(
        "You need to be logged in to add a review!"
      );
    },
    bookReservation: async (parent, { reservationId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const reservation = await Reservation.findOne({
        _id: reservationId,
      });
      if (!reservation) {
        return null;
      }

      // if reservation is already claim return null
      if (reservation.user) {
        return null;
      }
      // reservation.user = context.user_id
      reservation.set("user", context.user._id);
      await reservation.save();
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { reservations: reservation._id } }
      );
      await reservation.populate(["user", "restaurant"]);
      return reservation;
    },
    cancelReservation: async (parent, { reservationId }, context) => {
      if (context.user) {
        const reservation = await Reservation.findOneAndDelete({
          _id: reservationId,
          reservationAuthor: context.user.username,
        });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedReservation: reservation._id } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
