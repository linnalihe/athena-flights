import 'reflect-metadata';
import 'dotenv-safe/config';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

import { Launch as LaunchObj } from './entities/Launch';
import { Session } from './entities/Session';
import { User } from './entities/User';

import { LaunchResolver } from './resolvers/launch';
import LaunchAPI from './dataSources/launch';
import { BookingResolver } from './resolvers/booking';

// register 3rd party IOC container
useContainer(Container);

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true, //entities will be synced with database every time the app is ran
    entities: [LaunchObj, Session, User],
  });

  const dataSources = () => ({
    launchAPI: new LaunchAPI(),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LaunchResolver, BookingResolver],
      container: Container,
      validate: false,
    }),
    dataSources,
  });

  apolloServer.listen(parseInt(process.env.PORT as string)).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

main().catch((err) => {
  console.error(err);
});
