import React from 'react';
import { TextField } from '@mui/material';

function Input({ label, name, value, onChange, type = 'text', error = null, helperText = '', fullWidth = true, ...other }) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      error={!!error}
      helperText={error ? error : helperText}
      fullWidth={fullWidth}
      {...other}
    />
  );
}

export default Input;
