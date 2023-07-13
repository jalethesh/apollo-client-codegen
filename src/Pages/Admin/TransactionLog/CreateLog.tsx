import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useParams } from 'react-router';
import { useCreateTransactionLogMutation } from '../../../types/graphql';
import { GET_TRANSACTION_LOGS } from '../../../graphql/queries';
import { TextField, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateTransactionLog() {
  const { databaseId } = useParams<{ databaseId: string }>();

  const [createTransactionLog, { loading: isCreating }] =
    useCreateTransactionLogMutation({
      refetchQueries: [
        {
          query: GET_TRANSACTION_LOGS,
          variables: { transactionId: parseInt(databaseId) },
        },
      ],
    });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: any) => {
    if (e.keyCode === 13) {
      if (isCreating) {
        toast.warn(
          'Another request is running, Please do it a few seconds later...',
        );
      } else {
        handleCreateTransactionLog(e.target.value).finally(() => {
          e.target.value = '';
        });
      }
    }
  };

  const handleCreateTransactionLog = useCallback(
    async (message: string) => {
      try {
        await toast.promise(
          createTransactionLog({
            variables: {
              message: message,
              transactionId: parseInt(databaseId),
            },
          }),
          {
            pending: 'Pending...',
            success: {
              render({ data }) {
                // @ts-ignore
                if (data.data.createTransactionLog.ok)
                  return 'Created new transaction log';
                else return `Can't Create new log`;
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
    },
    [createTransactionLog, databaseId],
  );

  return (
    <>
      <Box sx={{ my: 2 }}>
        <TextField
          placeholder="Please put a comment and press Enter"
          variant="standard"
          fullWidth
          inputRef={inputRef}
          onKeyUp={handleChange}
        />
      </Box>
      <ToastContainer />
    </>
  );
}
