import React from 'react';
import Link from 'next/link';

import {
  AppBar,
  Button,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'none',
    },
    toolbar: {
      maxWidth: theme.breakpoints.values.desktop,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      color: 'black',
      userSelect: 'none',
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    logoText: {
      color: 'white',
    },
  })
);

const NavBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <AppBar className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <Link href='/'>
            <a className={classes.logoText}>Athena Flights</a>
          </Link>
        </div>
        <Button
          variant='contained'
          color={isSmallScreen ? 'primary' : 'secondary'}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
