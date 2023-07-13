import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface UserListOptionType {
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<UserListOptionType>();

export default function SelecUsertList(props: any) {
  const { listvalue, userlist, onChange } = props;

  const [value, setValue] = useState<UserListOptionType | null>(listvalue);
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState('');
  const newVal: UserListOptionType[] = userlist
    .filter((x: string) => x != null)
    .map((x: string) => ({ title: x }));

  const handleClose = () => {
    setDialogValue('');
    toggleOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({ title: dialogValue });
    handleClose();
    onChange(dialogValue);
  };

  return (
    <>
      <Autocomplete
        value={value}
        size="small"
        sx={{ width: '100%', marginTop: 1 }}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue(newValue);
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue(newValue.inputValue);
          } else {
            setValue(newValue);
            onChange(newValue?.title);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={newVal}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        // clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        // freeSolo
        renderInput={(params) => <TextField {...params} label="List" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any item in your Lists ? Please, add it !
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="new list"
              fullWidth
              value={dialogValue}
              onChange={(event) => setDialogValue(event.target.value)}
              label="new list"
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
    </>
  );
}
