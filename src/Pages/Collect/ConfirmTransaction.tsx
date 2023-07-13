import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface ConfirmTransactionProps {
  open: boolean;
  listName: string;
  handleDisagree: () => void;
  handleAgree: () => void;
}

export default function ConfirmTransaction(props: ConfirmTransactionProps) {
  const { open, listName, handleDisagree, handleAgree } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      keepMounted
      onClose={handleDisagree}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Trade-in cards in "{listName}" list for credit?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Please review the items and confirm.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>Cancel</Button>
        <Button onClick={handleAgree}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
