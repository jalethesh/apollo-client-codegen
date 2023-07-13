import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { useGetUserQuery } from '../../types/graphql';

import { userEffectiveRoleVar, userDataVar } from '../../graphql';

// docs https://www.tutorialstuff.com/tutorials/a-image-magnifying-react-components-for-mouse-and-touch-2020
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from 'react-image-magnifiers';

import initialImage from '../../assets/sampleCard/demo.jpg';
import originImage from '../../assets/sampleCard/demo.jpg';

export default function Profile() {
  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);
  const userData = useReactiveVar(userDataVar);

  const { userId } = useParams<{ userId: string }>();

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useGetUserQuery({
    variables: { userId: parseInt(userId) },
  });

  if (loadingUser) {
    return <Box>loading...</Box>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h4" sx={{ color: 'darkgray' }}>
        {userId === userData?.databaseId
          ? userData?.username
          : dataUser?.user?.username}{' '}
        Profile Page
      </Typography>
      {userId === userData?.databaseId && (
        <Link to="/user-setting">
          <Button variant="outlined"> Profile Setting</Button>
        </Link>
      )}
    </Box>
  );
}
