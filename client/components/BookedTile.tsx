import { useMutation } from '@apollo/client';
import { CANCEL_BOOKING } from '../graphql/mutations/cancelBooking';
import { BookingInput } from '../interfaces';
import Router from 'next/router';

import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Launch } from '../interfaces';
import formatDate from '../utils/format-date';
import { Session } from 'next-auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      margin: '1rem',
    },
    media: {
      height: 140,
    },
    bodyText: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    popup: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70vw',
      maxWidth: theme.breakpoints.values.laptop,
      background: theme.palette.grey[900],
    },
  })
);

const BookedTile = ({
  launch,
  session,
}: {
  launch: Launch;
  session: Session;
}) => {
  if (!session || !launch) {
    Router.reload();
    return <></>;
  }
  const [cancelBooking] = useMutation(CANCEL_BOOKING);

  const classes = useStyles();
  const accessToken = session.accessToken;
  const launchID = launch.id ? parseInt(launch.id) : undefined;

  const bookingInput: BookingInput = {
    accessToken,
    launchID,
  };

  const handleOnCancel = () => {
    cancelBooking({
      variables: { input: bookingInput },
    });

    Router.reload();
  };

  let img: string;
  if (launch.destination === 'Earth Orbit') {
    img = '/iss.jpg';
  } else if (launch.destination === 'Moon') {
    img = '/moon.jpg';
  } else if (launch.destination === 'Mars') {
    img = '/mars.jpg';
  } else {
    img = '/space.jpg';
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component='img'
          image={img}
          alt={launch.destination}
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {launch.destination}
          </Typography>
          <Typography variant='h6' component='div'>
            {launch.rocket?.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            <span>{formatDate(launch.departureDate as string)}</span>
            <span> &mdash; </span>
            <span>{formatDate(launch.returnDate as string)}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='contained' color='secondary' onClick={handleOnCancel}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookedTile;
