import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import Table from '../../components/Table'; // Reusable Table component
import Navbar from '../../components/Navbar'; // Navbar for top layout
import Sidebar from '../../components/Sidebar'; // Sidebar for navigation

function Plans() {
  const [plans, setPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    smsLimit: ''
  });

  useEffect(() => {
    // Fetch existing plans from the server
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/admin/plans');
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const handleAddPlan = () => {
    // Ensure all fields are filled before adding a plan
    if (newPlan.name && newPlan.price && newPlan.smsLimit) {
      // Add the new plan to the list
      setPlans((prevPlans) => [...prevPlans, { ...newPlan }]);

      // Reset the new plan fields after adding
      setNewPlan({ name: '', price: '', smsLimit: '' });

      // Close the modal
      setOpen(false);
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar /> 

      <Box className="flex flex-grow pt-20"> {/* Added pt-20 for spacing below Navbar */}
        {/* Sidebar on the left */}
        <Box className="w-1/5 min-h-screen bg-gray-200"> {/* Ensure Sidebar doesn't overlap */}
          <Sidebar />
        </Box>

        {/* Main content area for the Plans Management */}
        <Box className="flex-grow p-5 bg-gray-100 overflow-y-auto">
          <Typography variant="h4" gutterBottom className="text-2xl font-semibold">
            Plan & Customer Management
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            className="mb-5"
          >
            Add New Plan
          </Button>

          {/* Table for displaying plans */}
          <Table
            columns={['Plan Name', 'Price', 'SMS Limit', 'Actions']}
            data={plans.map((plan) => ({
              ...plan,
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
              )
            }))}
          />

          {/* Modal for adding a new plan */}
          <Modal open={open} onClose={handleClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg">
              <Typography variant="h6" className="text-lg font-semibold mb-4">
                Add New Plan
              </Typography>
              <TextField
                label="Plan Name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={newPlan.price}
                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="SMS Limit"
                value={newPlan.smsLimit}
                onChange={(e) => setNewPlan({ ...newPlan, smsLimit: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPlan}
                className="mt-4"
              >
                Add Plan
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default Plans;
