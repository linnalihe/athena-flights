import React from 'react';

import { Backdrop, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.grey[900],
      zIndex: theme.zIndex.drawer + 1,
    },
    loadingImg: {
      width: '100%',
      maxWidth: theme.breakpoints.values.mobile,
    },
  })
);

const HomePageLoading = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <img src='/rocket-loading.gif' className={classes.loadingImg} />
    </Backdrop>
  );
};

export default HomePageLoading;
