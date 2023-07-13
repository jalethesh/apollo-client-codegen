import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface StatusSelectorProps {
  handleSelect: (event: any, newValue: string[] | null) => void;
}

export default function StatusSelector(props: StatusSelectorProps) {
  const { handleSelect } = props;

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={statuses}
      size="small"
      getOptionLabel={(option) => ''}
      disableCloseOnSelect
      limitTags={1}
      onChange={handleSelect}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option} style={{ fontSize: 10 }}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={selected}
            size="small"
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Status" variant="standard" />
      )}
      style={{ minWidth: 100 }}
    />
  );
}

const statuses = [
  'CLIENT_REVIEW',
  'PURPLEMANA_REVIEW',
  'TRADEIN_ARRIVING',
  'CREDIT_ISSUED',
];
