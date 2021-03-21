import { gql } from '@apollo/client';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    site
    remainingSeats
    destination
    departureDate
    returnDate
    rocket {
      id
      name
    }
    mission {
      name
      missionPatchSmall
    }
  }
`;
