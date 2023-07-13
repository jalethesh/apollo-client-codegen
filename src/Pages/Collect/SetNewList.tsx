import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface SetNewListProps {
  open: boolean;
  handleClose: () => void;
  handleCreate: (newListName: string) => void;
}

export default function SetNewList(props: SetNewListProps) {
  const { open, handleClose, handleCreate } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [listValue, setListValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (listValue) handleCreate(listValue);
  };

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Are you going to add a new list?</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please type the name of new list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="New_List_Name"
            fullWidth
            value={listValue}
            onChange={(event) => setListValue(event.target.value)}
            label="New List Name"
            type="text"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
