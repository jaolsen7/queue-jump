const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type User {
    _id: ID!
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
    phone_number: String!
    time: String!
    location: String!
    party_size: Int!
    restaurant: Restaurant
    user: User
  }

  input ReservationInput {
    phone_number: String!
    time: String!
    location: String!
    party_size: Int!
    restaurantId: ID!
    userId: ID
  }
  
  type Query {
    "Find the logged in user."
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!, username: String!): Auth
    login(email: String!, password: String!): Auth
  }

  type Auth {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
