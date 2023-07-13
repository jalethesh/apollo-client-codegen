import React from 'react';
import { Box } from '@mui/material';

interface HoverImageProps {
  url?: string;
}

export default function HoverImage(props: HoverImageProps) {
  const { url } = props;

  return (
    <>
      <Box
        component="img"
        sx={{
          position: 'fixed',
          borderRadius: '5%',
          bottom: 0,
          right: 0,
          visibility: 'hidden',
          opacity: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          height: { xs: 'auto', sm: '100vh' },
          width: { xs: 'calc(100vw - 100px)', sm: 'auto' },
          transition: 'visibility 450ms, opacity 450ms',
        }}
        src={url}
        className="hover-image"
      />
    </>
  );
}
