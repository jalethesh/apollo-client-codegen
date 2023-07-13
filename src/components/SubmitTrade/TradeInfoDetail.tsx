import React from 'react';
import { TableRow, TableCell } from '@mui/material';

import { currencyFormatter } from '../../helpers';
import { RealItemObject } from '../../types/graphql';

interface TradeInforDetailProps {
  realItem: RealItemObject;
}

export default function TradeInfoDetail(props: TradeInforDetailProps) {
  const { realItem } = props;
  return (
    <TableRow sx={{ display: 'table-row !important' }}>
      <TableCell sx={{ display: 'table-cell !important' }}>
        {realItem?.genericItems?.edges?.[0]?.node?.name}
      </TableCell>
      <TableCell
        sx={{
          display: 'table-cell !important',
          padding: { xs: '8px', sm: '16px' },
        }}
      >
        {realItem?.condition}
      </TableCell>
      <TableCell
        sx={{
          display: 'table-cell !important',
          width: '120px',
          padding: { xs: '8px', sm: '16px' },
        }}
      >
        {currencyFormatter({
          value: (realItem?.fmv || 0) as number,
        })}
      </TableCell>
    </TableRow>
  );
}
