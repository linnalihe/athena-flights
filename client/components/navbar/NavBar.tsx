import React, { useMemo, useState } from 'react';
import Link from 'next/link';

import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import NavBarButtons from './NavBarButtons';
import { DrawerContext } from '../../ contexts';
import Drawer from './Drawer';
import { signIn, signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: 'none',
      zIndex: 1400,
      backgroundColor: 'rgba(0,0,0,0)',
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
  const [session, loading] = useSession();
  const classes = useStyles();

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const drawerValue = useMemo(() => ({ drawerIsOpen, setDrawerIsOpen }), [
    drawerIsOpen,
    setDrawerIsOpen,
  ]);

  const buttonsContent = [
    { text: 'Home', link: '/' },
    { text: 'Explore', link: '/explore' },
    { text: 'Profile', link: '/profile' },
    { text: 'Sign In', link: '/api/auth/signin' },
  ];

  if (session) {
    buttonsContent[3].text = 'Sign Out';
    buttonsContent[3].link = '/api/auth/signout';
  }

  return (
    <DrawerContext.Provider value={drawerValue}>
      <AppBar className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <Link href='/'>
              <a className={classes.logoText}>Athena Flights</a>
            </Link>
          </div>
          <NavBarButtons buttonsContent={buttonsContent} />
        </Toolbar>
      </AppBar>
      <Drawer buttonsContent={buttonsContent} />
    </DrawerContext.Provider>
  );
};

export default NavBar;
