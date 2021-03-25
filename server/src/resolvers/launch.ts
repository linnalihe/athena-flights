import { Arg, Resolver, Query, Ctx, ObjectType, Field } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { Launch as LaunchObj } from '../entities/Launch';
import { Launch, LaunchConnection } from './types/launch';
import { Context } from '../types';
import paginateResults from '../utils/paginateResults';
import { LaunchesInput } from './types/launch-input';
import generateBookingInfo from '../utils/generateBookingInfo';
import filterResults from '../utils/filterResults';

@ObjectType()
export class FilterOptions {
  @Field((_type) => [String]!, {
    description: 'a list of unique departure dates for all launches',
  })
  dates: string[];

  @Field((_type) => [String]!, {
    description: 'a list of unique departure destinations for all launches',
  })
  destinations: string[];
}

@Resolver()
@Service()
export class LaunchResolver {
  constructor(
    @InjectRepository(LaunchObj)
    private readonly seatRepository: Repository<LaunchObj>
  ) {}

  @Query(() => LaunchConnection)
  async launches(
    @Ctx() { dataSources }: Context,

    @Arg('input') launchInput: LaunchesInput
  ): Promise<LaunchConnection> {
    const { pageSize, cursor, filter } = launchInput;

    const allLaunches: Launch[] = await dataSources.launchAPI.getAllLaunches();
    let launches = allLaunches;
    let lastLaunch = allLaunches[allLaunches.length - 1];

    // filterResults needs launch.destination and launch.departureDate to work,
    // so those parameters need to be generated beforehand with generateBookingInfo
    if (typeof filter !== 'undefined') {
      launches = await generateBookingInfo(launches, this.seatRepository);
      launches = filterResults(launches, filter);
      lastLaunch = launches[launches.length - 1];
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
        ? launches[launches.length - 1].cursor !== lastLaunch.cursor
        : false,
    };
  }

  @Query(() => FilterOptions)
  async filterOptions(@Ctx() { dataSources }: Context): Promise<FilterOptions> {
    const allLaunches: Launch[] = await dataSources.launchAPI.getAllLaunches();
    let launches = await generateBookingInfo(allLaunches, this.seatRepository);

    const destinations: string[] = [];
    const destinationsSet = new Set<string>();
    const dates: string[] = [];
    const datesSet = new Set<string>();

    launches.forEach((launch) => {
      if (launch.destination && !destinationsSet.has(launch.destination)) {
        destinations.push(launch.destination);
      }

      if (launch.destination) {
        destinationsSet.add(launch.destination);
      }

      if (
        launch.departureDate &&
        !datesSet.has(launch.departureDate.getFullYear().toString())
      ) {
        dates.push(launch.departureDate.getFullYear().toString());
      }

      if (launch.departureDate) {
        datesSet.add(launch.departureDate.getFullYear().toString());
      }
    });

    return { dates, destinations };
  }
}
