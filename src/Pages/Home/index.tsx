import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { useReactiveVar } from '@apollo/client';
import client from '../../graphql';
import { userEffectiveRoleVar, userDataVar } from '../../graphql';
import AutoCompleteCardSearch from 'components/AutoCompleteCardSearch';
import { GenericItemObject } from 'types/graphql';
import getGenericId from 'helpers/getGenericId';

export default function Home() {
  const backend_uri = process.env.REACT_APP_JUZAM2_URI;
  const frontend_uri = process.env.REACT_APP_URI;
  const userEffectiveRole = useReactiveVar(userEffectiveRoleVar);
  const userData = useReactiveVar(userDataVar);
  const history = useHistory();

  const guest_endpoint =
    process.env.REACT_APP_JUZAM2_URI + `/users/login_as_guest`;
  const handleLoginAsGuest = () => {
    axios
      .get(guest_endpoint, { withCredentials: true })
      .then(async (res: any) => {
        // @ts-ignore
        window.location = process.env.REACT_APP_URI;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGoToCollect = () => {
    // @ts-ignore
    window.location = process.env.REACT_APP_URI + '/collect';
  };

  const handleLoginWP = () => {
    // @ts-ignore
    window.location = `${backend_uri}/login?return_url=${frontend_uri}`;
  };

  const handleLoginCognito = () => {
    // @ts-ignore
    window.location = `${backend_uri}/cognito?return_url=${frontend_uri}`;
  };
  if (userEffectiveRole === 'nologin') {
    return (
      <Box
        sx={{
          color: 'gray',
          display: 'flex',
          flexDirection: { sm: 'column', md: 'row' },
          justifyContent: 'space-between',
        }}
        display={'block'}
      >
        <AutoCompleteCardSearch
          onSelect={(item) =>
            history.push(`/generic-item/${getGenericId(item.id)}`)
          }
          placeholder="Search for Cards . . ."
          itemPerPage={25}
        />
        <Box>
          <Box sx={{ color: 'gray' }} display={'block'}>
            <Typography>
              {' '}
              First you will need a Purplemana.com account{' '}
            </Typography>

            <Button onClick={handleLoginWP} variant="contained">
              Create Purplemana.com account
            </Button>
            <br />
          </Box>
          <Box sx={{ color: 'gray' }} display={'block'}>
            <br />
            <Typography>
              Then login by selecting "Log in with username and password" on
              next page{' '}
            </Typography>
            <Button onClick={handleLoginWP} variant="contained">
              Login with Purplemana.com account
            </Button>
          </Box>
          <Box sx={{ color: 'gray' }} display={'block'}>
            <br />
            <Typography>
              {' '}
              You can also login as a guest - guest data will be deleted
              periodically{' '}
            </Typography>
            <Button onClick={handleLoginAsGuest} variant="contained">
              Login as Guest
            </Button>
          </Box>
          <Box sx={{ color: 'gray' }} display={'block'}>
            <br />
            <Typography> You can also login through google </Typography>
            <Button onClick={handleLoginCognito} variant="contained">
              Login with Google
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'darkgray' }}>
        Welcome back {userData?.username}
      </Typography>
      <br />
      <AutoCompleteCardSearch
        onSelect={(item) =>
          history.push(`/generic-item/${getGenericId(item.id)}`)
        }
        placeholder="Search for Cards . . ."
        itemPerPage={25}
      />
      <br />
      <Button onClick={handleGoToCollect} variant="contained">
        Build your collection
      </Button>
    </Box>
  );
}
