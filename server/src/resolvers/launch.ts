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
import filterResults from '../utils/filterResults';

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
    const { pageSize, cursor, filter } = launchInput;

    const allLaunches: Launch[] = await dataSources.launchAPI.getAllLaunches();
    let launches = allLaunches;

    // filterResults needs launch.destination and launch.departureDate to work,
    // so those parameters need to be generated beforehand with generateBookingInfo
    if (typeof filter !== 'undefined') {
      launches = await generateBookingInfo(launches, this.seatRepository);
      launches = filterResults(launches, filter);
    }

    launches = paginateResults({
      cursor,
      pageSize,
      results: launches,
    });

    // if no filter is given, we can generate booking info for only paginated launches
    // instead of all launches
    if (typeof filter === 'undefined') {
      launches = await generateBookingInfo(launches, this.seatRepository);
    }

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
