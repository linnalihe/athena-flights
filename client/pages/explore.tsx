import { useQuery } from '@apollo/client';
import LaunchTile from '../components/LaunchTile';

import Layout from '../components/Layout';
import { GET_LAUNCHES } from '../graphql/queries/getLaunches';
import { Launch, LaunchConnection, LaunchesInput } from '../interfaces';

const Explore = () => {
  const launchesInput: LaunchesInput = {
    pageSize: 2,
  };

  const { data, loading, error } = useQuery(GET_LAUNCHES, {
    variables: { input: launchesInput },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  const launchConnection: LaunchConnection = data.launches;
  const launches = launchConnection.launches;

  // console.log(launches);

  return (
    <Layout title='Explore'>
      {launches &&
        launches.map((launch: Launch) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
    </Layout>
  );
};

export default Explore;
