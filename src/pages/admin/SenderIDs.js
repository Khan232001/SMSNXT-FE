// src/pages/admin/SenderIDs.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Modal, TextField } from '@mui/material';
import Sidebar from '../../components/AdminSidebar'; 
import Navbar from '../../components/Navbar'; 
import Table from '../../components/Table'; 

function SenderIDs() {
  const [senderIDs, setSenderIDs] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSenderID, setNewSenderID] = useState('');

  useEffect(() => {
    // Fetch sender IDs from the API
    const fetchSenderIDs = async () => {
      try {
        const response = await fetch('/api/admin/senderIDs'); // Replace with real endpoint
        const data = await response.json();
        setSenderIDs(data);
      } catch (error) {
        console.error("Error fetching sender IDs:", error);
      }
    };
    fetchSenderIDs();
  }, []);

  const handleAddSenderID = () => {
    if (newSenderID) {
      setSenderIDs((prevSenderIDs) => [...prevSenderIDs, { id: newSenderID }]);
      setNewSenderID('');
      setOpen(false);
    } else {
      alert('Please enter a sender ID');
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="flex h-screen">
      {/* Sidebar with fixed width */}
      <Box sx={{ width: '250px' }}>
        <Sidebar />
      </Box>

      {/* Main content area */}
      <Box className="flex-grow p-5">
        {/* Navbar */}
        <Navbar /> <br />

        {/* Sender ID Management Section */}
        <Paper className="p-5 mt-5">
          <Typography variant="h4" gutterBottom className="text-2xl font-semibold mb-5">
            Sender ID Management
          </Typography>

          {/* Button to add new Sender ID */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            className="mb-5"
          >
            Add New Sender ID
          </Button>

          {/* Sender ID Table */}
          <Table
            columns={['Sender ID', 'Actions']}
            data={senderIDs.map((senderID, index) => ({
              ...senderID,
              actions: (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="mr-2"
                  >
                    Delete
                  </Button>
                </>
              ),
            }))}
          />

          {/* Modal for adding new Sender ID */}
          <Modal open={open} onClose={handleClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg">
              <Typography variant="h6" className="text-lg font-semibold mb-4">
                Add New Sender ID
              </Typography>
              <TextField
                label="Sender ID"
                value={newSenderID}
                onChange={(e) => setNewSenderID(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSenderID}
                className="mt-4"
              >
                Add Sender ID
              </Button>
            </Box>
          </Modal>
        </Paper>
      </Box>
    </Box>
  );
}

export default SenderIDs;
