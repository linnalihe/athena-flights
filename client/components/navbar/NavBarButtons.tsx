import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import ToggleDrawerButton from './ToggleDrawerButton';

import NextLink from '../NextLink';
import { ButtonContent } from '../../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: 'white',
      textTransform: 'none',
      fontSize: '1rem',
      marginRight: '20px',
      // hide nav buttons when screen width < 769px
      // nav buttons will be replaced with drawer in Drawer.tsx
      [theme.breakpoints.down('tablet')]: {
        display: 'none',
      },
      '&focusVisible, &:hover': {
        color: theme.palette.secondary.main,
        transition: 'color 0.25s ease',
      },
    },
    buttonFocusVisible: {},
  })
);

const NavBarButtons = ({
  buttonsContent,
}: {
  buttonsContent: ButtonContent[];
}) => {
  const classes = useStyles();

  return (
    <div>
      {buttonsContent.map(({ link, text }) => (
        <Button
          key={link}
          disableRipple={true}
          component={NextLink}
          href={link}
          classes={{
            root: classes.button,
            focusVisible: classes.buttonFocusVisible,
          }}
        >
          {text}
        </Button>
      ))}
      <ToggleDrawerButton />
    </div>
  );
};

export default NavBarButtons;
