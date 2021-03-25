import { gql } from '@apollo/client';
import { LAUNCH_TILE_DATA } from './launchTileData';

export const GET_FILTERED_LAUNCHES = gql`
  query filteredLaunches($input: FilteredLaunchesInput!) {
    filteredLaunches(input: $input) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;
