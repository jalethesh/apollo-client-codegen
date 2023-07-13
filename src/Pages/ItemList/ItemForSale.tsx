import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

interface ItemForSaleProps {
  open: boolean;
  value: string;
  handleClose: () => void;
  handleUpdate: (sale: string) => void;
}

export default function ItemForSale(props: ItemForSaleProps) {
  const { open, value, handleClose, handleUpdate } = props;

  const [sale, setSale] = useState<string>(value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(Number(sale));
    if (!Number(sale)) {
      toast.error(`Price should be a number`, {
        theme: 'dark',
      });
    } else {
      handleClose();
      handleUpdate(sale);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Type a price for sale</DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              margin="dense"
              id="sale"
              fullWidth
              type="text"
              name="numberformat"
              value={sale}
              onChange={(event) => setSale(event.target.value)}
              startAdornment={<Typography> &#36; </Typography>}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
