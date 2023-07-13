import React, { useMemo, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { userDataVar } from '../../graphql';
import { Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { toast, ToastContainer } from 'react-toastify';

import { useUpdateUserMutation } from '../../types/graphql';
import { GET_USER } from '../../graphql/queries';

export default function Account() {
  const userData = useReactiveVar(userDataVar);
  const [name, setName] = useState('');

  useMemo(() => {
    setName(userData?.username);
  }, [userData]);

  const [updateUser, { data, loading, error }] = useUpdateUserMutation({
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  });

  const handleUpdate = async () => {
    try {
      await toast.promise(
        updateUser({
          variables: {
            databaseId: userData?.databaseId,
            username: name,
          },
        }),
        {
          pending: 'Pending...',
          success: {
            render({ data }) {
              // @ts-ignore
              if (data.data.updateUser.ok) return 'Updated the User Name';
              else return `Can't Update the Name`;
            },
          },
        },
        {
          theme: 'dark',
        },
      );
    } catch (e) {
      toast.error(`${e}`, {
        theme: 'dark',
      });
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ color: 'darkgray' }}>
        {userData?.username}'s account page
      </Typography>
      <FormControl variant="standard">
        <TextField
          label="Name"
          size="small"
          value={name}
          variant="standard"
          onChange={(event: any) => setName(event.target.value)}
        />
        <Button variant="outlined" onClick={handleUpdate}>
          Update
        </Button>
      </FormControl>
      <ToastContainer />
    </>
  );
}
