import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ value, onChange }) {
  return (
    <TextField
    sx={{marginTop:5}}
      type="text"
      placeholder="Search shared text..."
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
}

export default SearchBar;
