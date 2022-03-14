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
      return User.findOne({ email: ctx.user.email }).populate("favorites");
    },
    reservations: async (parent, args, context) => {
      return Reservation.find({}).populate("restaurant");
    },
    reservation: async (parent, args, context) => {
      return Reservation.findOne({ _id }).populate("restaurant");
    },
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
          {_id: context.user._id},
          { $addToSet: { favorites: restaurantId }},
        ).populate('favorites')        
      }
      throw new AuthenticationError("You need to be logged in to favorite!");
    },
    removeFavorite: async (parent, { restaurantId }, context) => {  
      if (context.user) {
        return await User.findOneAndUpdate(
          {_id: context.user._id},
          { $pull: { favorites: restaurantId }},
        ).populate('favorites')        
      }
      throw new AuthenticationError("You need to be logged in to remove a favorite!");
    },
    bookReservation: async (parent, { args }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedReservation: {
                party_size,
                userId,
                location,
                time,
              },
            },
          },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    cancelReservation: async (parent, { reservationId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedReservation: { reservationId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
