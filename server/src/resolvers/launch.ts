import { Arg, Resolver, Query, Ctx } from 'type-graphql';
// import { Seat } from '../entities/Seat';
import { Launch, LaunchConnection } from './types/launch';
import { Context } from '../types';
import paginateResults from '../utils/paginateResults';
import { LaunchesInput } from './types/launch-input';

@Resolver()
export class LaunchResolver {
  @Query(() => LaunchConnection)
  async launches(
    @Ctx() { dataSources }: Context,

    @Arg('input') launchInput: LaunchesInput
  ): Promise<LaunchConnection> {
    const { pageSize, cursor } = launchInput;

    const allLaunches: Launch[] = await dataSources.launchAPI.getAllLaunches();

    // TODO: filter by year and/or destination

    const launches = paginateResults({
      cursor,
      pageSize,
      results: allLaunches,
    });

    // TODO: add destination, departure and arrival dates, and remaining seats

    return {
      launches,
      cursor: launches.length ? launches[launches.length - 1].cursor : null,
      // if the cursor of the end of the paginated results is the same as the
      // last item in _all_ results, then there are no more results after this
      hasMore: launches.length
        ? launches[launches.length - 1].cursor !==
          allLaunches[allLaunches.length - 1].cursor
        : false,
    };
  }
}
