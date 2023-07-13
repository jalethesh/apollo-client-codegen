import React, { ReactNode } from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';

interface TitleProps {
  title?: string;
  titleIcon?: ReactNode;
}

export default function AssetDetailTitle(props: TitleProps) {
  const { title, titleIcon } = props;

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          bgcolor: 'purple',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          borderTopRightRadius: '5px',
          borderTopLeftRadius: '5px',
        }}
      >
        <IconButton>{titleIcon}</IconButton>
        <Typography variant="h5" sx={{ marginLeft: '10px' }}>
          {title}
        </Typography>
      </Box>
    </Stack>
  );
}
