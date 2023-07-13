import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/system';

export default function CardSkeleton() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        height="300px"
        width="100%"
        animation="wave"
        sx={{ borderRadius: '10px' }}
      />
      <Skeleton variant="text" animation="wave" height="40px" />
      <Skeleton variant="text" width="60%" animation="wave" height="50px" />
      <Skeleton variant="rectangular" animation="wave" height="30px" />
    </Box>
  );
}
