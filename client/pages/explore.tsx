import { useState } from 'react';
import { useQuery } from '@apollo/client';

import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';

import LaunchTilesContainer from '../components/LaunchTilesContainer';
import Layout from '../components/Layout';
import { GET_LAUNCHES } from '../graphql/queries/getLaunches';
import { LaunchConnection, LaunchesInput } from '../interfaces';

const useStyles = makeStyles(() =>
  createStyles({
    viewMore: {
      marginBottom: '1rem',
    },
  })
);

const Explore = () => {
  const classes = useStyles();
  const pageSize = 10;

  const launchesInput: LaunchesInput = {
    pageSize,
  };

  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES, {
    variables: { input: launchesInput },
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>Error: {error.message}</Layout>;
  if (!data) return <Layout>Not found</Layout>;

  const launchConnection: LaunchConnection = data.launches;
  const launches = launchConnection.launches;

  // console.log(launches);

  return (
    <Layout title='Explore'>
      <LaunchTilesContainer launches={launches} />
      {data.launches &&
        data.launches.hasMore &&
        (isLoadingMore ? (
          <CircularProgress color='primary' className={classes.viewMore} />
        ) : (
          <Button
            className={classes.viewMore}
            color='primary'
            variant='contained'
            onClick={async () => {
              setIsLoadingMore(true);
              await fetchMore({
                variables: {
                  input: {
                    pageSize,
                    cursor: data.launches.cursor,
                  },
                },
              });
              setIsLoadingMore(false);
            }}
          >
            View More
          </Button>
        ))}
    </Layout>
  );
};

export default Explore;
