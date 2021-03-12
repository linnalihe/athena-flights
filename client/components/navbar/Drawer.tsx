import React, { useContext } from 'react';

import {
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { DrawerContext } from '../../ contexts';
import { ButtonContent } from '../../interfaces';
import NextLink from '../NextLink';

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      width: 'auto',
      paddingTop: '50px',
    },
  })
);

const Drawer = ({ buttonsContent }: { buttonsContent: ButtonContent[] }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isLaptopScreen = useMediaQuery(theme.breakpoints.up('tablet'));

  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);

  const handleCloseDrawer = () => {
    setDrawerIsOpen(false);
  };

  const handleOpenDrawer = () => {
    setDrawerIsOpen(true);
  };

  return (
    <SwipeableDrawer
      anchor='right'
      open={drawerIsOpen}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      disableBackdropTransition={true}
      disableSwipeToOpen={isLaptopScreen}
    >
      <div
        className={classes.list}
        role='presentation'
        onClick={handleCloseDrawer}
      >
        <List>
          {buttonsContent.map(({ link, text }) => {
            return (
              <ListItem button key={text} component={NextLink} href={link}>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
