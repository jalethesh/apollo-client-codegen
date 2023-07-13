import React from 'react';
import { Box, Typography } from '@mui/material';

interface RecentSaleProps {
  date?: string;
  where?: string;
  condition?: string;
  price?: number;
  seller?: string;
}

export default function RecentSale(props: RecentSaleProps) {
  const { date, where, condition, price, seller } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row-reverse', sm: 'row' },
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 2,
      }}
    >
      <Box sx={{ marginLeft: { xs: '10px', sm: 0 } }}>
        <Typography variant="h6">{date}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {`SELLER: ${seller}`}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {`WHERE : $${where}`}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {`CONDITION : $${condition}`}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {`PRICE : $${price}`}
        </Typography>
      </Box>
      <img width="220" src={'/image_sold.png'} alt={'image_sold-swamp'} />
    </Box>
  );
}
