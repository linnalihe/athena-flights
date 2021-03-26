import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import {
  createStyles,
  makeStyles,
  Button,
  Input,
  FormGroup,
  FormControl,
  Theme,
  Backdrop,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Layout from '../components/Layout';
import { CREATE_BOOKING } from '../graphql/mutations/createBooking';
import { BookingInput } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
    loadingImg: {
      width: '100%',
      maxWidth: theme.breakpoints.values.mobile,
    },
    snackbar: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    snackbarButton: {
      color: theme.palette.secondary.main,
    },
  })
);

const booking = () => {
  const [session] = useSession();
  const classes = useStyles();
  const router = useRouter();
  const [createBooking] = useMutation(CREATE_BOOKING);
  const [open, setOpen] = useState(false);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  if (!session) {
    return <p>You must be signed in to book a flight</p>;
  }

  const bookingInput: BookingInput = {
    accessToken: session.accessToken as string,
    launchID: parseInt(router.query.launchID as string),
  };

  const handleCreateBooking = async () => {
    handleOpen();
    await createBooking({
      variables: {
        input: bookingInput,
      },
    });
    handleClose();
    setSnackbarIsOpen(true);
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarIsOpen(false);
  };

  return (
    <Layout title='Book Your Flight'>
      <div className={classes.container}>
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
          <Button
            variant='outlined'
            fullWidth
            className={classes.button}
            onClick={handleCreateBooking}
          >
            Confirm
          </Button>
        </FormGroup>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <img src='/rocket-loading.gif' className={classes.loadingImg} />
        </Backdrop>
        <Snackbar
          ContentProps={{
            classes: {
              root: classes.snackbar,
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbarIsOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message={`Success!`}
          action={
            <>
              <Button
                className={classes.snackbarButton}
                size='small'
                onClick={handleCloseSnackbar}
                href='/profile'
              >
                VIEW BOOKINGS
              </Button>
              <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={handleClose}
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </>
          }
        />
      </div>
    </Layout>
  );
};

export default booking;
