import React from 'react';
import { Typography } from '@mui/material';
import { currencyFormatter } from '../helpers';

interface CalculationProps {
  multiplier: number;
  price: number;
  condition: string;
}

export default function Calculation(props: CalculationProps) {
  const { multiplier, price, condition } = props;

  return (
    <Typography sx={{ textAlign: 'right', width: '100%' }}>
      {multiplier} ( {condition} ) &nbsp; X &nbsp; 0.8 X &nbsp;
      {currencyFormatter({ value: price })} &nbsp; = &nbsp;
      {currencyFormatter({ value: multiplier * price * 0.8 })}
    </Typography>
  );
}
