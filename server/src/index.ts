import 'reflect-metadata';
import 'dotenv-safe/config';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { Seat } from './entities/Seat';

import { LaunchResolver } from './resolvers/launch';
import LaunchAPI from './dataSources/launch';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true, //entities will be synced with database every time the app is ran
    entities: [Seat],
  });

  const dataSources = () => ({
    launchAPI: new LaunchAPI(),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [LaunchResolver],
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
