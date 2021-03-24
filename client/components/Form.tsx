import React from 'react';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import { createStyles, makeStyles, Input, Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      paddingRight: '5px',
      borderBottom: 'solid 2px white',
      color: 'white',
    },
  })
);

const Form = () => {
  const classes = useStyles();
  return (
    <div>
      <label className={classes.input}>From</label>
      <Input type='text' className={classes.input} />
      <label className={classes.input}>To</label>
      <Input className={classes.input} />
      <label className={classes.input}>Date</label>
      <Input type='date' className={classes.input} />
      <Button startIcon={<FlightTakeoff />}>Search</Button>
    </div>
  );
};

export default Form;
