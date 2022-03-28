import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      phone_number
      full_name
      username
      email
      lastLogin
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
        photo_link
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
        photo_link
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

export const QUERY_MYFAVORITES = gql`
  query myFavorites {
    me {
      favorites {
        restaurant_name
        food_type
        description
        _id
        photo_link
      }
    }
  }
`;

export const QUERY_MYRESERVATIONS = gql`
  query myReservations {
    me {
      reservations {
        time
        location
        party_size
        restaurant {
        photo_link
        restaurant_name
        }
      }
    }
  }
`;

export const QUERY_RESTAURANTS = gql`
query Restaurants {
  restaurants {
    _id
    restaurant_name
    food_type
    description
    menu_link
    photo_link
    reservations {
      _id
    }
  }
}`;