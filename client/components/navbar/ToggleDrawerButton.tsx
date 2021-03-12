import { useContext } from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { DrawerContext } from '../../ contexts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      // hide menu button when screen width >= 769px
      // note: menu swipe-to-open is also disabled for width >= 769px in Drawer.tsx
      [theme.breakpoints.up('tablet')]: {
        display: 'none',
      },
    },
  })
);

const ToggleDrawerButton = () => {
  const classes = useStyles();
  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);

  const handleToggleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <IconButton
      onClick={handleToggleDrawer}
      edge='start'
      className={classes.menuButton}
      color='inherit'
      aria-label='menu'
    >
      {drawerIsOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  );
};

export default ToggleDrawerButton;
