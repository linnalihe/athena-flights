import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import {
  createStyles,
  makeStyles,
  Button,
  Input,
  FormGroup,
  FormControl,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      margin: 'auto',
      padding: '10px',
    },
    button: {
      marginTop: '15px',
      backgroundColor: 'black',
      color: 'white',
      border: '2px solid black',
    },
  })
);

const booking = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const classes = useStyles();

  return (
    <Layout>
      {session && (
        <div>
          <h1>Flight Booking</h1>
          <FormGroup className={classes.form}>
            <FormControl>
              <label>First Name</label>
              <Input />
            </FormControl>
            <FormControl>
              <label>Last Name</label>
              <Input />
            </FormControl>
            <FormControl>
              <label>Email</label>
              <Input />
            </FormControl>
            <FormControl>
              <label>Flight No.</label>
              <Input />
            </FormControl>
            <FormControl>
              <label>Seat No.</label>
              <Input />
            </FormControl>

            <Button variant='outlined' fullWidth className={classes.button}>
              Confirm
            </Button>
          </FormGroup>
        </div>
      )}
    </Layout>
  );
};

export default booking;
