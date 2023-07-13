import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import ConfirmTransaction from './ConfirmTransaction';
import { useCreateTransactionMutation } from '../../types/graphql';
import { GET_ITEM_LISTS, GET_TRANSACTIONS } from '../../graphql/queries';
import { ToastContainer, toast } from 'react-toastify';

interface SubmitTradeProps {
  listId: number;
  itemListNumber: number;
}

export default function SubmitTrade(props: SubmitTradeProps) {
  const { listId, itemListNumber } = props;
  const [loadingTrade, setLoadingTrade] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const [createTransaction] = useCreateTransactionMutation({
    refetchQueries: [
      {
        query: GET_ITEM_LISTS,
      },
      {
        query: GET_TRANSACTIONS,
      },
    ],
  });

  const submitTransaction = async () => {
    setOpen(false);
    setLoadingTrade(true);
    try {
      await toast.promise(
        createTransaction({
          variables: { itemListId: listId },
        }),
        {
          pending: 'Submit is on pending',
          success: 'Your list was submitted to admins for review',
          error: 'Submit error',
        },
        {
          theme: 'dark',
        },
      );
      history.push('/list-shipinfo');
    } catch (e) {
      toast.error(`${e}`, {
        theme: 'dark',
      });
    }
    setLoadingTrade(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <LoadingButton
        onClick={() => setOpen(true)}
        color="success"
        endIcon={<SendIcon />}
        loading={loadingTrade}
        loadingPosition="center"
        variant="outlined"
        size="large"
        sx={{ width: '100%' }}
      >
        Trade-In Cards for Credit
      </LoadingButton>
      <ToastContainer />
      <ConfirmTransaction
        open={open}
        listId={listId}
        itemlength={itemListNumber}
        handleDisagree={() => setOpen(false)}
        handleAgree={submitTransaction}
      />
    </Box>
  );
}
