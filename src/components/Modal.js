import React from 'react';
import { Modal as MuiModal, Box, Typography, Button,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 3,
};

function Modal({ open, handleClose, title, children ,confirm ,handleConfirm}) {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
  
    >
      <Box sx={style}>
        <Box className=" flex justify-between items-center border-b border-gray-400 ">
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        </Box>
        <Box className="py-4">
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
        </Box>
        <Box   className="flex justify-end gap-2">
        <Button onClick={handleClose} sx={{ mt: 2 ,borderRadius:'10px', border:'1px solid gray' ,padding:'5px 20px',backgroundColor:'gray',color:'#000' }}>
          Close
        </Button>
        {confirm &&(
        <Button onClick={handleConfirm} sx={{ mt: 2 ,borderRadius:'10px', border:'1px solid #3B82F6',padding:'5px 20px',backgroundColor:'#3B82F6',color:'#fff' }}>
          Confirm
        </Button>
       ) }
        </Box>
      </Box>
    </MuiModal>
  );
}

export default Modal;
