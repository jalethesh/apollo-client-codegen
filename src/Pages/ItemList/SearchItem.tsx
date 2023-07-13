import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface SearchItemProps {
  handleSearch: (searchName: string | undefined) => void;
}

export default function SearchItem(props: SearchItemProps) {
  const { handleSearch } = props;
  const [name, setName] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
    setName(event.target.value);
  };

  return (
    <Box>
      <TextField
        placeholder="Search by Name"
        value={name}
        onChange={handleChange}
      />
    </Box>
  );
}
