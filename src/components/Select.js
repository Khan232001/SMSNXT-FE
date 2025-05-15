import React from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';

function Select({ label, name, value, onChange, options = [], fullWidth = true }) {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;
