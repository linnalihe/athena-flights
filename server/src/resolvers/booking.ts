import {
  Arg,
  Resolver,
  Query,
  Ctx,
  Mutation,
  InputType,
  Field,
  Int,
  ObjectType,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Launch as LaunchObj } from '../entities/Launch';
import { User } from '../entities/User';
import { Session } from '../entities/Session';
import { Context } from '../types';
import { Launch } from './types/launch';
import generateBookingInfo from '../utils/generateBookingInfo';

@InputType()
class BookingInput {
  @Field()
  accessToken: string;

  @Field((_type) => Int)
  launchID: number;
}

@ObjectType()
class BookingResponse {
  @Field()
  success: boolean;
}

@Resolver()
@Service()
export class BookingResolver {
  constructor(
    @InjectRepository(LaunchObj)
    private readonly seatRepository: Repository<LaunchObj>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>
  ) {}

  @Query(() => [Launch])
  async getBookings(
    @Ctx() { dataSources }: Context,
    @Arg('accessToken') accessToken: string
  ): Promise<Launch[]> {
    const session = await this.sessionRepository.findOne({
      where: { access_token: accessToken },
    });

    let user;
    if (session) {
      user = await this.userRepository.findOne({
        where: { id: session.user_id },
      });
    }
    console.log(user);

    let launches: Launch[] = [];
    if (user && user.booked_launches) {
      launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds: user.booked_launches,
      });
      launches = await generateBookingInfo(launches, this.seatRepository);
    }

    return launches;
  }

  @Mutation(() => BookingResponse)
  async createBooking(
    @Arg('input') createBookingInput: BookingInput
  ): Promise<BookingResponse> {
    const { accessToken, launchID } = createBookingInput;

    const session = await this.sessionRepository.findOne({
      where: { access_token: accessToken },
    });

    let user: User | undefined;
    if (session) {
      user = await this.userRepository.findOne({
        where: { id: session.user_id },
      });
    }

    // verify that user exists and was fetched
    if (!user) return { success: false };

    let currentlyBookedLaunches = user.booked_launches
      ? user.booked_launches
      : [];

    // verify that launchID to be booked is has not already been booked by this user
    if (currentlyBookedLaunches.indexOf(launchID) != -1)
      return { success: false };

    // verify that there are available seats on that launch
    let seat = await this.seatRepository.findOne({ where: { id: launchID } });
    if (!seat || seat.remainingSeats <= 0) {
      return { success: false };
    }

    currentlyBookedLaunches.push(launchID);
    user.booked_launches = currentlyBookedLaunches;
    await this.userRepository.save(user);

    seat.remainingSeats -= 1;
    await this.seatRepository.save(seat);

    return { success: true };
  }

  @Mutation(() => BookingResponse)
  async cancelBooking(
    @Arg('input') cancelBookingInput: BookingInput
  ): Promise<BookingResponse> {
    const { accessToken, launchID } = cancelBookingInput;

    const session = await this.sessionRepository.findOne({
      where: { access_token: accessToken },
    });

    let user: User | undefined;
    if (session) {
      user = await this.userRepository.findOne({
        where: { id: session.user_id },
      });
    }

    // verify that user exists and booking array is not null
    if (!user || user.booked_launches == null) return { success: false };

    user.booked_launches = user.booked_launches.filter((id) => id !== launchID);

    let seat: LaunchObj | undefined;

    seat = await this.seatRepository.findOne({ where: { id: launchID } });
    if (seat === undefined) {
      return { success: false };
    }

    // verify that the given launchID was deleted from the booking array
    if (user.booked_launches.indexOf(launchID) === -1) {
      seat.remainingSeats += 1;
      await this.userRepository.save(user);
      await this.seatRepository.save(seat);
      return { success: true };
    }

    return { success: false };
  }
}
