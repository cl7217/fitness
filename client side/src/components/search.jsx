import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="חפש..."
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      size="medium"
      sx={{ width: '100%', maxWidth: 400 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const CenteredSearchPage = () => {
  const handleSearch = (query) => {
    console.log('🔍 מחפש את:', query);
  };

  return (
    <Box
      sx={{
        height: '100vh', // גובה מסך מלא
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <SearchBar onSearch={handleSearch} />
    </Box>
  );
};

export default CenteredSearchPage;
