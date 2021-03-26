import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    zero: true;
    mobile: true;
    tablet: true;
    laptop: true;
    laptopL: true;
    desktop: true;
  }
}

const muiTheme = createMuiTheme({
  /**
   * Breakpoints example:
   *
   * - theme.breakpoints.up('tablet') will apply to screen sizes >= 769
   * - theme.breakpoints.down('tablet') will apply to screen sizes < 769
   */
  breakpoints: {
    values: {
      zero: 0, // xs ranges from 0 to 425, inclusive
      mobile: 426,
      tablet: 769,
      laptop: 1025,
      laptopL: 1441,
      desktop: 1921,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7E34AF',
    },
    secondary: {
      main: '#F07158',
    },
  },
});

export default muiTheme;
