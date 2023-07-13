import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function BackHistory() {
  const history = useHistory();

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => history.goBack()}
        variant={'outlined'}
      >
        Back
      </Button>
    </Box>
  );
}
