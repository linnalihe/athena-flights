import { gql } from '@apollo/client';
import { LAUNCH_TILE_DATA } from './launchTileData';

export const GET_LAUNCHES = gql`
  query Launches($input: LaunchesInput!) {
    launches(input: $input) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;
