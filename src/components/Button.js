import React from 'react';
import { Button as MuiButton } from '@mui/material';

function Button({ text, onClick, color = 'primary', variant = 'contained', size = 'medium', disabled = false }) {
  return (
    <MuiButton
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
    >
      {text}
    </MuiButton>
  );
}

export default Button;
