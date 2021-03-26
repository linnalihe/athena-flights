import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Launch } from '../interfaces';
import BookedTile from './BookedTile';
import { Session } from 'next-auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      padding: '2rem',
      maxWidth: theme.breakpoints.values.laptopL,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  })
);

const BookedTilesContainer = ({
  launches,
  session,
}: {
  launches: Launch[];
  session: Session;
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {launches &&
        launches.map((launch: Launch) => (
          <BookedTile launch={launch} session={session} key={launch.id} />
        ))}
    </div>
  );
};

export default BookedTilesContainer;
