import { gql } from '@apollo/client';

export const CREATE_BOOKING = gql`
  mutation createBooking($input: BookingInput!) {
    createBooking(input: $input) {
      success
    }
  }
`;
