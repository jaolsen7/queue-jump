import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      favorites {
        _id
        restaurant_name
        food_type
        description
        menu_link
      }
    }
  }
`;
export const QUERY_RESERVATIONS = gql`
  query Reservation {
    reservations {
      _id
      time
      location
      party_size
      restaurant {
        _id
        restaurant_name
        food_type
        description
        menu_link
      }
    }
  }
`;
export const QUERY_RESERVATION = gql`
  query Reservation($reservationId: ID!) {
    reservation(id: $reservationId) {
      _id
      time
      location
      party_size
      restaurant {
        _id
        restaurant_name
        food_type
        description
        menu_link
      }
      user {
        _id
        phone_number
        full_name
        email
      }
    }
  }
`;