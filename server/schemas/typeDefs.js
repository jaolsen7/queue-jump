const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type User {
    _id: ID!
    phone_number: String
    full_name: String!
    username: String!
    email: String!
    lastLogin: Date
    reservations: [Reservation]
    favorites: [Restaurant]
  }

  type Restaurant {
    _id: ID!
    restaurant_name: String!
    food_type: [String]!
    description: String!
    menu_link: String
    photo_link: String
    reservations: [Reservation]
  }

  type Reservation {
    _id: ID!
    time: String!
    location: String!
    party_size: Int!
    restaurant: Restaurant
    user: User
  }

  type Query {
    "Find the logged in user."
    me: User
    all_reservations: [Reservation]
    reservation(reservationId: ID!): Reservation
    restaurants: [Restaurant]
  }

  type Mutation {
    createUser(
      phone_number: String!
      full_name: String!
      email: String!
      password: String!
      username: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addFavorite(restaurantId: ID!): User
    removeFavorite(restaurantId: ID!): User
    bookReservation(reservationId: ID!): Reservation
    cancelReservation(reservationId: ID!): User
  }

  type Auth {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
