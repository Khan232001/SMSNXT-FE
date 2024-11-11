import React from 'react';
import { Modal as MuiModal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Modal({ open, handleClose, title, children }) {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </MuiModal>
  );
}

export default Modal;
