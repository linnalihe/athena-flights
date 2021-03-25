import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Launch } from '../interfaces';
import LaunchTile from './LaunchTile';
import Link from 'next/link';

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
          <Link href='/booking'>
            <a>
              <LaunchTile key={launch.id} launch={launch} />
            </a>
          </Link>
        ))}
    </div>
  );
};

export default LaunchTilesContainer;
