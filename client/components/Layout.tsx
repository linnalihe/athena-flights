import React, { ReactNode } from 'react';
import Head from 'next/head';

import { createStyles, CssBaseline, makeStyles } from '@material-ui/core';

import { NavBar } from './navbar';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    contentContainer: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  })
);

interface Props {
  children?: ReactNode;
  title?: string;
}

const Layout = ({ children, title = 'Athena Flights' }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <NavBar />
      <div className={classes.contentContainer}>{children}</div>
    </div>
  );
};

export default Layout;
