import { gql } from "@apollo/client";

export const ME = gql`
query Me {
  me {
    _id
    phone_number
    full_name
    username
    email
    lastLogin
    reservations {
      _id
      time
      location
      party_size
      restaurant {
        _id
      }
    }
  }
  }
}
`;
export const QUERY_RESERVATIONS = gql`
  query allReservations {
    allReservations {
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
        username
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
      _id
      time
      location
      party_size
      restaurant {
        _id
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
  }
}`;