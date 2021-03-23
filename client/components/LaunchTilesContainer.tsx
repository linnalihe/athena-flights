import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Launch } from '../interfaces';
import LaunchTile from './LaunchTile';

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

const LaunchTilesContainer = ({ launches }: { launches: Launch[] }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {launches &&
        launches.map((launch: Launch) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
    </div>
  );
};

export default LaunchTilesContainer;
