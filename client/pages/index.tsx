import { createStyles, makeStyles } from '@material-ui/core';
import Layout from '../components/Layout';
import Form from '../components/Form';
import React from 'react';

import { useSession } from 'next-auth/client';
import { useQuery } from '@apollo/client';

import { GET_FILTERS } from '../graphql/queries/getFilters';
import HomePageLoading from '../components/loading/HomePageLoading';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: 'auto',
      padding: '25px',
      border: '1px solid gray',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,.5)',
      minWidth: '500px',
    },
  })
);
const IndexPage = () => {
  const [session] = useSession();
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_FILTERS);

  if (loading) return <HomePageLoading />;
  if (error) return `Error: ${error.message}`;
  if (!data) return 'Not found';

  return (
    <Layout img={'vincentiu-solomon-ln5drpv_ImI-unsplash.jpg'}>
      <div className={classes.container}>
        <h1>
          {session &&
            session.user &&
            session.user.name &&
            `Hi, ${session.user.name.split(' ')[0]}!`}{' '}
          Find your next adventure 🚀
        </h1>
        <Form data={data} />
      </div>
    </Layout>
  );
};

export default IndexPage;
