import React, { useState, useEffect } from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface SortingItemProps {
  handleSorting: (sortKey: string | undefined, sortReverse: boolean) => void;
}

export default function SortingItem(props: SortingItemProps) {
  const { handleSorting } = props;
  const [sortOption, setSortOption] = useState({
    reverse: false,
    fmv: false,
    itemHash: false,
    sortKey: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'fmv') {
      if (event.target.checked) {
        setSortOption({
          ...sortOption,
          fmv: true,
          itemHash: false,
          sortKey: 'fmv',
        });
      } else
        setSortOption({
          ...sortOption,
          fmv: false,
          itemHash: false,
          sortKey: '',
        });
    }
    if (event.target.name === 'itemHash') {
      if (event.target.checked) {
        setSortOption({
          ...sortOption,
          fmv: false,
          itemHash: true,
          sortKey: 'item_hash',
        });
      } else
        setSortOption({
          ...sortOption,
          fmv: false,
          itemHash: false,
          sortKey: '',
        });
    }
    if (event.target.name === 'reverse') {
      setSortOption({
        ...sortOption,
        reverse: event.target.checked,
      });
    }
  };

  useEffect(() => {
    handleSorting(sortOption.sortKey, sortOption.reverse);
  }, [sortOption, handleSorting]);

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      sx={{
        marginLeft: { xs: 0, md: '20px' },
        marginBottom: { xs: 0, md: '-10px' },
      }}
    >
      <FormGroup row sx={{ alignItems: 'flex-end' }}>
        <FormGroup>
          <FormLabel component="legend" sx={{ fontSize: '18px' }}>
            Sorting Option
          </FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={sortOption.reverse}
                onChange={handleChange}
                name="reverse"
              />
            }
            label="Reverse"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={sortOption.fmv}
                onChange={handleChange}
                name="fmv"
              />
            }
            label="Value"
          />
          <FormControlLabel
            control={
              <Switch
                checked={sortOption.itemHash}
                onChange={handleChange}
                name="itemHash"
              />
            }
            label="Set/Name"
          />
        </FormGroup>
      </FormGroup>
    </FormControl>
  );
}
