import { createStyles, makeStyles } from '@material-ui/core';
import Layout from '../components/Layout';
import Canvas from '../components/Canvas';
import Form from '../components/Form';
import React from 'react';
import { useSession } from 'next-auth/client';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: 'auto',
      padding: '25px',
      border: '1px solid gray',
      borderRadius: '5px',
      color: 'white',
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  })
);

const IndexPage = () => {
  const [session, loading] = useSession();
  const classes = useStyles();

  return (
    <Layout>
      <Canvas />
      <div className={classes.container}>
        <h1>
          {session && `Hi, ${session.user.name.split(' ')[0]}!`} Book your
          flight to the stars 🚀
        </h1>
        <Form />
        {/* <label className={classes.input}>From</label>
        <Input type='text' className={classes.input} />
        <label className={classes.input}>To</label>
        <Input className={classes.input} />
        <label className={classes.input}>Date</label>
        <Input type='date' className={classes.input} />
        <Button startIcon={<FlightTakeoff />}>Search</Button> */}
      </div>
    </Layout>
  );
};

export default IndexPage;
