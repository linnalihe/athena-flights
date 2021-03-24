import React, { useState, useEffect } from 'react';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
import {
  createStyles,
  makeStyles,
  Input,
  Button,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_FILTERS } from '../graphql/queries/getFilters';

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

  const { data, loading, error } = useQuery(GET_FILTERS);
  console.log(data);
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  if (!data) return 'Not found';

  return (
    <div>
      <label className={classes.input}>Destination</label>
      <Select className={classes.input}>
        {data.filterOptions.destinations.map((dest: string) => (
          <MenuItem value={dest}>{dest}</MenuItem>
        ))}
      </Select>
      <label className={classes.input}>Before Year</label>
      <Select className={classes.input}>
        {data.filterOptions.dates.map((date: string) => (
          <MenuItem value={date}>{date}</MenuItem>
        ))}
      </Select>

      <Button startIcon={<FlightTakeoff />}>Search</Button>
    </div>
  );
};

export default Form;
