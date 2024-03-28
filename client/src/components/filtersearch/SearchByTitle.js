import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useValue } from '../../context/ContextProvider';

const SearchByTitle = () => {
  const { dispatch } = useValue();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch({
      type: 'FILTER_TITLE',
      payload: searchTerm.trim() !== '' ? searchTerm : null,
    });
  }, [searchTerm, dispatch]);

  return (
    <TextField
      value={searchTerm}
      onChange={handleSearchChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default SearchByTitle;
