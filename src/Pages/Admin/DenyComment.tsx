import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

interface DenyCommentProps {
  open: boolean;
  handleClose: () => void;
  handleComment: (comment: string) => void;
}

export default function DenyComment(props: DenyCommentProps) {
  const { open, handleClose, handleComment } = props;

  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleComment(comment);
    handleClose();
  };

  const handleWidthoutComment = () => {
    handleComment('');
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Is there any reason why you deny this transaction? Please add a
              comment!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              fullWidth
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              label="Comment"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add comment</Button>
            <Button onClick={handleWidthoutComment}>
              Deny without comment
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
