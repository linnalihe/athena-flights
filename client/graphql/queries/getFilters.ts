import { gql } from '@apollo/client';

export const GET_FILTERS = gql`
  query {
    filterOptions {
      dates
      destinations
    }
  }
`;
