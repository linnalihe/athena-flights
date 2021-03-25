import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { Filter, LaunchConnection, LaunchesInput } from '../interfaces';
import { GET_LAUNCHES } from '../graphql/queries/getLaunches';
import Layout from '../components/Layout';
import LaunchTilesContainer from '../components/LaunchTilesContainer';
import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    viewMore: {
      marginBottom: '1rem',
    },
  })
);

const results = () => {
  const classes = useStyles();
  const router = useRouter();

  const pageSize = 5;

  let filter: Filter = {};
  if (
    router.query.destination &&
    typeof router.query.destination === 'string'
  ) {
    filter.destination = router.query.destination;
  }

  if (router.query.departDate && typeof router.query.departDate === 'string') {
    filter.priorToDate = router.query.departDate;
  }

  const launchesInput: LaunchesInput = {
    pageSize,
    filter,
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

  return (
    <Layout title='Results'>
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
                    filter,
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

export default results;
