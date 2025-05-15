import React from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

function Checkbox({ label, name, checked, onChange }) {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          name={name}
          checked={checked}
          onChange={onChange}
        />
      }
      label={label}
    />
  );
}

export default Checkbox;
