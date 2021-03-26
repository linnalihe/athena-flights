import { gql } from '@apollo/client';

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($input: BookingInput!) {
    cancelBooking(input: $input) {
      success
    }
  }
`;
