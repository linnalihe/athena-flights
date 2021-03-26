import { useState } from 'react';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  IconButton,
  Modal,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { Launch } from '../interfaces';
import formatDate from '../utils/format-date';
import BookLaunchButton from './BookLaunchButton';

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
      padding: '1rem',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70vw',
      maxWidth: theme.breakpoints.values.tablet,
      background: theme.palette.grey[900],
      [theme.breakpoints.down('tablet')]: {
        width: '80vw',
      },
      [theme.breakpoints.down('mobile')]: {
        width: '95vw',
      },
    },
    closeButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
  })
);

const LaunchTile = ({ launch }: { launch: Launch }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const launchID = launch.id as string;

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
      <CardActionArea onClick={handleOpen}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={classes.popup}>
          <div className={classes.closeButton}>
            <IconButton aria-label='close popup' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography gutterBottom variant='h3' component='div'>
            {launch.mission?.name}
          </Typography>
          <Typography gutterBottom variant='h6' component='div'>
            <span>
              <strong>Destination: </strong>
            </span>
            <span>{launch.destination}</span>
          </Typography>
          <Typography gutterBottom variant='h6' component='div'>
            <span>
              <strong>Depature Date: </strong>
            </span>
            <span>{formatDate(launch.departureDate as string)}</span>
          </Typography>
          <Typography gutterBottom variant='h6' component='div'>
            <span>
              <strong>Return Date: </strong>
            </span>
            <span>{formatDate(launch.returnDate as string)}</span>
          </Typography>
          <Typography gutterBottom variant='h6' component='div'>
            <span>
              <strong>Rocket: </strong>
            </span>
            <span>{launch.rocket?.name}</span>
          </Typography>
          <Typography gutterBottom variant='h6' component='div'>
            <span>
              <strong>Remaining Seats: </strong>
            </span>
            <span>{launch.remainingSeats}</span>
          </Typography>
          <BookLaunchButton id={launchID} />
        </Box>
      </Modal>
    </Card>
  );
};

export default LaunchTile;
