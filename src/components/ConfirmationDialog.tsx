import React from 'react';
import create from 'zustand';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

type Comment = {
  value: string;
  setComment: (comment: string) => void;
  placeholder?: string;
  label?: string;
};

type ConfirmDialogStore = {
  title: string;
  description?: string;
  comment?: Comment;
  onSubmit?: () => void;
  close: () => void;
};

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  title: '',
  description: '',
  onSubmit: undefined,
  comment: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export const confirmDialog = (
  onSubmit: () => void,
  title: string,
  description?: string,
  comment?: Comment,
) => {
  useConfirmDialogStore.setState({
    title,
    description,
    onSubmit,
    comment,
  });
};

export default function ConfirmationDialog() {
  const { title, description, comment, onSubmit, close } =
    useConfirmDialogStore();

  return (
    <Dialog
      open={Boolean(onSubmit)}
      onClose={close}
      aria-labelledby="alert-confirm-title"
      aria-describedby="alert-confirm-description"
    >
      <DialogTitle id="alert-confirm-title">{title}</DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText id="alert-confirm-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}
      {comment && (
        <TextField
          sx={{ margin: '0 15px' }}
          label={comment.label}
          multiline
          rows={4}
          defaultValue={comment.value}
          onChange={(e) => comment.setComment(e.target.value)}
        />
      )}
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
