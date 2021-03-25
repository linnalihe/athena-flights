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
import { useRouter } from 'next/router';

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
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_FILTERS);
  console.log(data);
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  if (!data) return 'Not found';

  const handleChangeDest = (e: React.ChangeEvent<{ value: string }>) => {
    setDestination(e.target.value);
  };

  const handleChangeDepartDate = (e: React.ChangeEvent<{ value: string }>) => {
    setDepartDate(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //create the query to the server to get specific destination and date
    //pass results to a results page
    //redirect user to the results page
    router.push({
      pathname: '/results',
      query: { destination, departDate },
    });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} id='filter_form'>
        <label className={classes.input}>Destination</label>
        <Select className={classes.input} onChange={handleChangeDest}>
          {data.filterOptions.destinations.map((dest: string) => (
            <MenuItem value={dest}>{dest}</MenuItem>
          ))}
        </Select>
        <label className={classes.input}>Before Year</label>
        <Select className={classes.input} onChange={handleChangeDepartDate}>
          {data.filterOptions.dates.map((date: string) => (
            <MenuItem value={date}>{date}</MenuItem>
          ))}
        </Select>

        <Button startIcon={<FlightTakeoff />} type='submit'>
          Search
        </Button>
      </form>
    </div>
  );
};

export default Form;
