import { Arg, Resolver, Query, ObjectType, Field, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Launch as LaunchObj } from '../entities/Launch';
import { User } from '../entities/User';
import { Session } from '../entities/Session';
import { Context } from '../types';

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

  @Mutation(() => User)
  async createBooking(
    @Ctx() { dataSources }: Context,
    @Arg('accessToken') accessToken: string,
    @Arg('launchID') launchID: number
  ): Promise<User | undefined> {
    const session = await this.sessionRepository.findOne({
      where: { access_token: accessToken },
    });

    let user;
    if (session) {
      user = await this.userRepository.findOne({
        where: { id: session.user_id },
      });
    }

    return user;
  }
}
