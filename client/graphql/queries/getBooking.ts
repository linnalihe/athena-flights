import { gql } from '@apollo/client';

export const GET_BOOKING = gql`
  query getBookings($accessToken: String!) {
    getBookings(accessToken: $accessToken) {
      id
      site
      rocket {
        name
      }
      destination
      departureDate
      returnDate
    }
  }
`;
