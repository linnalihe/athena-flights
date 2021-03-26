import React, { ReactNode } from 'react';
import Head from 'next/head';

import { createStyles, CssBaseline, makeStyles } from '@material-ui/core';

import { NavBar } from './navbar';

interface MUIProps {
  img: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: (props: MUIProps) => ({
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: `url(${props.img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
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
  img?: string;
}

const Layout = ({ children, title = 'Athena Flights', img }: Props) => {
  const muiProps: MUIProps = { img: img as string };
  const classes = useStyles(muiProps);

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
