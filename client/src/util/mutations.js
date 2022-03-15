import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation CreateUser($phoneNumber: String!, $fullName: String!, $email: String!, $password: String!, $username: String!) {
  createUser(phone_number: $phoneNumber, full_name: $fullName, email: $email, password: $password, username: $username) {
    token
    user {
      _id
      phone_number
      full_name
      username
      email
    }
  }
}`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
mutation addFavorite($restaurantId: ID!) {
  addFavorite(restaurantId: $restaurantId) {
    favorites {
      _id
      restaurant_name
      food_type
      description
      menu_link
    }
  }
}`;

export const REMOVE_FAVORITE = gql`
mutation removeFavorite($restaurantId: ID!) {
  removeFavorite(restaurantId: $restaurantId) {
    favorites {
      _id
      restaurant_name
      food_type
      description
      menu_link
    }
  }
}`;

export const BOOK_RESERVATION = gql`
  mutation bookReservation($reservationData: BookReservationInput!) {
    bookReservation(reservationData: $reservationData) {
      _id
    time
    location
    party_size
    restaurant {
      restaurant_name
    }
    user {
      email
    }
  }
}`;