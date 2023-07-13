import React from 'react';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { currencyFormatter } from '../../helpers';

const StyledTootip = styled(Box)(
  ({ theme }) => `
  background: ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,.5)' : 'rgba(250,250,250,.8)'
  };
  border-radius: 10px;
  padding: 5px 10px;
  `,
);

export default function CustomTooltip({ active, payload, label }: any) {
  if (active && typeof payload[0] !== 'undefined') {
    return (
      <>
        <StyledTootip>
          <Typography sx={{ fontSize: '12px', lineHeight: '14px', margin: 0 }}>
            {moment(payload[0].payload.time)
              .utc()
              .format('MMM Do YYYY, h:mm A')}
          </Typography>
          <Typography sx={{ fontSize: '14px', lineHeight: '17px', margin: 0 }}>
            {currencyFormatter({ value: payload[0].payload.price })}
          </Typography>
        </StyledTootip>
      </>
    );
  }

  return null;
}
