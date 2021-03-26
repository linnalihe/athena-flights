import { gql } from '@apollo/client';

export const CANCEL_BOOKING = gql`
  mutation cancelBooking({$accessToken: String!, $launchID: int!}) {
    cancelBooking({accessToken : $accessToken, launchID : $launchID }) {
        sucess
    }
  }
`;
