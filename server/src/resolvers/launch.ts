import { Arg, Resolver, Query, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

import { Seat } from '../entities/Seat';
import { Launch, LaunchConnection } from './types/launch';
import { Context } from '../types';
import paginateResults from '../utils/paginateResults';
import { LaunchesInput } from './types/launch-input';
import generateBookingInfo from '../utils/generateBookingInfo';

@Resolver()
@Service()
export class LaunchResolver {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>
  ) {}

  @Query(() => LaunchConnection)
  async launches(
    @Ctx() { dataSources }: Context,

    @Arg('input') launchInput: LaunchesInput
  ): Promise<LaunchConnection> {
    const { pageSize, cursor } = launchInput;

    const allLaunches: Launch[] = await dataSources.launchAPI.getAllLaunches();

    // TODO: filter by year and/or destination

    let launches = paginateResults({
      cursor,
      pageSize,
      results: allLaunches,
    });

    // TODO: add destination, departure and arrival dates, and remaining seats
    launches = await generateBookingInfo(launches, this.seatRepository);

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
