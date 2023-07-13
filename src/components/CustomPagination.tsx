import React from 'react';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

interface PaginationProps {
  page: number;
  perPage: number;
  count: number;
  setHandlePage: (value: number) => void;
  setHandlePerPage: (value: number) => void;
}

export default function CustomPagination(props: PaginationProps) {
  const { page, perPage, count, setHandlePage, setHandlePerPage } = props;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setHandlePage(value - 1);
  };

  const handleChangePerPage = (event: SelectChangeEvent) => {
    setHandlePerPage(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: { xs: 'absolute', md: 'inherit' },
        bottom: -50,
        right: 0,
      }}
    >
      <FormControl
        sx={{
          m: 1,
          minWidth: 110,
          // display: { xs: "none", md: "inline-flex" }
          display: 'none',
        }}
        size="small"
      >
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#121112' : '#e6e6e6',
            paddingRight: '5px',
          }}
        >
          Items per page
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(perPage)}
          label="PerPage"
          onChange={handleChangePerPage}
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={48}>48</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        count={Math.ceil(count / perPage)}
        page={page + 1}
        onChange={handleChange}
        siblingCount={1}
      />
    </Box>
  );
}
