import React from 'react';
import ScrollTop from './ScrollTop';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Props {
  window?: () => Window;
}

export default function UpComponent(props: Props) {
  return (
    <ScrollTop {...props}>
      <Fab
        sx={{ backgroundColor: 'purple' }}
        color="secondary"
        size="small"
        aria-label="scroll back to top"
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
}
