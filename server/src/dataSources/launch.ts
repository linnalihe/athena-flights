import { RESTDataSource } from 'apollo-datasource-rest';

export default class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  // leaving this inside the class to make the class easier to test
  launchReducer(launch: any) {
    return {
      id: launch.flight_number || 0,
      cursor: launch.flight_number, // use flight number instead of launch_date_unix, which is not unique
      site: launch.launch_site && launch.launch_site.site_name,
      departureDate: new Date(launch.launch_date_utc),
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

  async getAllLaunches() {
    const response = await this.get('launches');

    // transform the raw launches to a more friendly format
    return Array.isArray(response)
      ? response.map((launch) => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({ launchId }: { launchId: number }) {
    const res = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(res[0]);
  }

  async getLaunchesByIds({ launchIds }: { launchIds: number[] }) {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchById({ launchId }))
    );
  }
}
