import React from 'react';
import { Box, Typography } from '@mui/material';

interface AvailableProps {
  condition?: string;
  price?: number;
  seller?: string;
}

export default function AvailableSale(props: AvailableProps) {
  const { condition, price, seller } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-around',
        alignItems: 'center',
        m: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle1">
          {`${condition} - $${price}`}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {`SELLER: ${seller}`}
        </Typography>
      </Box>
      <img
        width="220"
        src={'/image_available.png'}
        alt={'image_available-swamp'}
      />
    </Box>
  );
}
