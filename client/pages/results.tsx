import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { Filter, LaunchConnection, FilteredLaunchesInput } from '../interfaces';
import { GET_FILTERED_LAUNCHES } from '../graphql/queries/getFilteredLaunches';
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

  const pageSize = 120;

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

  const launchesInput: FilteredLaunchesInput = {
    pageSize,
    filter,
  };

  const { data, loading, error, fetchMore } = useQuery(GET_FILTERED_LAUNCHES, {
    fetchPolicy: 'no-cache',
    variables: { input: launchesInput },
  });

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>Error: {error.message}</Layout>;
  if (!data) return <Layout>Not found</Layout>;

  const launchConnection: LaunchConnection = data.filteredLaunches;
  const launches = launchConnection.launches;

  return (
    <Layout title='Results'>
      <LaunchTilesContainer launches={launches} />
      {data.filteredLaunches &&
        data.filteredLaunches.hasMore &&
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
                    cursor: data.filteredLaunches.cursor,
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
