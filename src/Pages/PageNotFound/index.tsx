import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Button } from '@mui/material';
import { varBounceIn } from '../../components/Animate';
import PageNotFoundIllustration from './illustration_404';

export default function PageNotFound() {
  return (
    <>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <motion.div variants={varBounceIn} animate="animate">
          <Typography variant="h4">Sorry, page not found!</Typography>
        </motion.div>
        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>
        <motion.div variants={varBounceIn} animate="animate">
          <PageNotFoundIllustration
            sx={{ height: '50vh', my: { xs: 5, sm: 10 } }}
          />
        </motion.div>
        <Button
          to="/"
          size="large"
          variant="contained"
          component={RouterLink}
          color="secondary"
        >
          Go to Home
        </Button>
      </Box>
    </>
  );
}
