import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';

import SetNewList from './SetNewList';

interface ItemControlHeaderProps {
  createItemList: any;
}

export default function ItemControlHeader(props: ItemControlHeaderProps) {
  const { createItemList } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateItemList = useCallback(
    async (name: string) => {
      try {
        await createItemList({
          variables: { name: name },
        });
      } catch (e) {
        toast.error(`${e}`, {
          theme: 'dark',
        });
      }
    },
    [createItemList],
  );

  const handleItemList = async (newListName: string) => {
    setOpen(false);
    setLoading(true);
    await handleCreateItemList(newListName);
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
      <LoadingButton
        color="success"
        onClick={(event: any) => setOpen(true)}
        loading={loading}
        loadingPosition="start"
        startIcon={<AddIcon />}
        variant="outlined"
      >
        Add List
      </LoadingButton>
      <SetNewList
        open={open}
        handleCreate={handleItemList}
        handleClose={() => setOpen(false)}
      />
    </Box>
  );
}
