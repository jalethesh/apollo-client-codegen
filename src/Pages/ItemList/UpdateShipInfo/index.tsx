import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useReactiveVar } from '@apollo/client';
import { Stack, TextField, Button, Typography, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useUpdateShipInfoMutation } from '../../../types/graphql';
import { userDataVar } from '../../../graphql';
import { GET_USER } from '../../../graphql/queries';

const errorText = 'This field is required to be filled';

export default function UpdateShipInfo() {
  const history = useHistory();
  const userData = useReactiveVar(userDataVar);
  const [inputs, setInputs] = useState({
    name: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [error, setError] = useState({
    name: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [updateShipInfo, { loading: isUpdating, error: updateError }] =
    useUpdateShipInfoMutation({
      refetchQueries: [
        {
          query: GET_USER,
        },
      ],
    });

  const handleCancel = () => {
    history.goBack();
  };

  const checkIsValid = () => {
    if (!inputs['name']) {
      setError((values: any) => ({ ...values, name: errorText }));
    }
    if (!inputs['street1']) {
      setError((values: any) => ({ ...values, street1: errorText }));
    }
    if (!inputs['street2']) {
      setError((values: any) => ({ ...values, street2: errorText }));
    }
    if (!inputs['city']) {
      setError((values: any) => ({ ...values, city: errorText }));
    }
    if (!inputs['state']) {
      setError((values: any) => ({ ...values, state: errorText }));
    }
    if (!inputs['zip']) {
      setError((values: any) => ({ ...values, zip: errorText }));
    }
    if (!inputs['country']) {
      setError((values: any) => ({ ...values, country: errorText }));
    }
    return Object.values(inputs).every((x) => x !== null && x !== '');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (checkIsValid()) {
        await toast.promise(
          updateShipInfo({
            variables: {
              ...inputs,
              databaseId: parseInt(userData?.databaseId),
            },
          }),
          {
            pending: 'Update is on pending',
            success: 'Successfully updated! 👌',
            error: 'Update rejected 🤯',
          },
          {
            theme: 'dark',
          },
        );
        history.goBack();
      }
    } catch (e) {
      toast.error(`${e}`, {
        theme: 'dark',
      });
    }
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    if (!value) {
      setError((values: any) => ({ ...values, [name]: errorText }));
    } else {
      setError((values: any) => ({ ...values, [name]: '' }));
    }
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h6" className="text-center">
        Your trade-in was submitted, an admin will review the trade soon. Please
        take this time to update your shipping information so we can pay for
        your shipping.
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
      >
        <TextField
          label="Name"
          name="name"
          type="string"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          error={!!error['name']}
          helperText={error['name'] && error['name']}
          onChange={handleChange}
        />
        <TextField
          label="Street1"
          name="street1"
          type="string"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          error={!!error['street1']}
          helperText={error['street1'] && error['street1']}
          onChange={handleChange}
        />
        <TextField
          label="Street2"
          name="street2"
          type="string"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          error={!!error['street2']}
          helperText={error['street2'] && error['street2']}
          onChange={handleChange}
        />
        <TextField
          label="City"
          name="city"
          type="string"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          error={!!error['city']}
          helperText={error['city'] && error['city']}
          onChange={handleChange}
        />
        <TextField
          label="State"
          name="state"
          type="string"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          error={!!error['state']}
          helperText={error['state'] && error['state']}
          onChange={handleChange}
        />
        <TextField
          label="Zip / Postal code"
          name="zip"
          type="string"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          error={!!error['zip']}
          helperText={error['zip'] && error['zip']}
          onChange={handleChange}
        />
        <TextField
          label="Country"
          name="country"
          type="string"
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          error={!!error['country']}
          helperText={error['country'] && error['country']}
          onChange={handleChange}
        />
        <Stack direction="row" style={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <LoadingButton
            type="submit"
            onClick={handleSubmit}
            loading={isUpdating}
            color="primary"
            variant="contained"
          >
            Submit
          </LoadingButton>
        </Stack>
      </Box>
      <ToastContainer />
    </Stack>
  );
}
