import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import {
  createStyles,
  CssBaseline,
  makeStyles,
  Input,
  Button,
  TextField,
} from '@material-ui/core';
import Layout from '../components/Layout';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: '100px',
      padding: '25px',
      border: '1px solid gray',
      borderRadius: '5px',
    },
    input: {
      paddingRight: '5px',
    },
  })
);

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.container}>
        <h1>Book your flight to the stars 🚀</h1>
        <label className={classes.input}>From</label>
        <Input type='text' className={classes.input} />
        <label className={classes.input}>To</label>
        <Input className={classes.input} />
        <label className={classes.input}>Date</label>
        <Input type='date' className={classes.input} />
        <Button startIcon={<FlightTakeoff />}>Search</Button>
      </div>
    </Layout>
  );
};

export default IndexPage;
