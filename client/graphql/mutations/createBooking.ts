import { gql } from '@apollo/client';

export const CREATE_BOOKING = gql`
  mutation createBooking({$accessToken: String!, $launchID: int!}){
    createBooking({accessToken : $accessToken, launchID : $launchID }) {
        sucess
    }
  }
`;
