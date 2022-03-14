const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type User {
    _id: ID!
    phone_number: String!
    full_name: String!
    username: String!
    email: String!
    lastLogin: Date!
    restaurant: [Restaurant]
    favorites: [Restaurant]
  }

  type Restaurant {
    _id: ID!
    restaurant_name: String!
    food_type: [String]!
    description: String!
    menu_link: String
  }

  type Reservation {
    _id: ID!
    time: String!
    location: String!
    party_size: Int!
    restaurant: Restaurant
    user: User
  }

  input BookReservationInput {
    party_size: Int!
    userId: ID!
    location: String!
    time: String!
  }

  type Query {
    "Find the logged in user."
    me: User
    reservations: [Reservation]!
    reservation(reservationId: ID!): Reservation
    favorites: [Restaurant]
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
    bookReservation(reservationData: BookReservationInput!): Reservation
    cancelReservation(reservationId: ID!): Reservation
  }

  type Auth {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
