import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Launch } from '../interfaces';
import formatDate from '../utils/format-date';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  bodyText: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const LaunchTile = ({ launch }: { launch: Launch }) => {
  const classes = useStyles();

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
          <Typography variant='body2' component='p'>
            <strong>{launch.destination}</strong>
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            <span>{formatDate(launch.departureDate as string)}</span>
            <span> &mdash; </span>
            <span>{formatDate(launch.returnDate as string)}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LaunchTile;
