import React from 'react';
import { useRouter } from 'next/router';

import { Button } from '@material-ui/core';

const BookLaunchButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push({
      pathname: '/booking',
      query: { launchID: id },
    });
  };

  return (
    <Button
      disableRipple={true}
      onClick={handleOnClick}
      variant='contained'
      color='secondary'
      fullWidth={true}
    >
      Book Launch
    </Button>
  );
};

export default BookLaunchButton;
