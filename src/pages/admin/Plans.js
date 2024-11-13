<<<<<<< HEAD
// src/pages/admin/Plans.js
=======
>>>>>>> acd4fce (first commit)
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar'; // Assuming Navbar is in components folder
import Sidebar from '../../components/Sidebar'; // Assuming Sidebar is in components folder
<<<<<<< HEAD
=======
import './Plans.css'; // Assuming a CSS file to style the page and components.
>>>>>>> acd4fce (first commit)

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
      const response = await fetch('/api/admin/plans');
      const data = await response.json();
      setPlans(data);
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
<<<<<<< HEAD
    <Box className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar /> <br /> <br />

      <Box className="flex flex-grow">
        {/* Sidebar on the left */}
        <Sidebar className="w-1/4" />

        {/* Main content area for the Plans Management */}
        <Box className="flex-grow p-5 bg-gray-100">
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
=======
    <Box className="admin-container">
      {/* Navbar at the top */}
      <Navbar /> <br/> <br/>

      <Box className="main-content">
        {/* Sidebar on the left */}
        <Sidebar className="sidebar" />

        {/* Main content area for the Plans Management */}
        <Box className="plans-content">
          <Typography variant="h4" gutterBottom>
            Plan & Customer Management
          </Typography> 
          
          <Button variant="contained" color="primary" onClick={handleOpen} className="add-plan-btn">
            Add New Plan
          </Button><br/><br/>
>>>>>>> acd4fce (first commit)

          {/* Table for displaying plans */}
          <Table
            columns={['Plan Name', 'Price', 'SMS Limit', 'Actions']}
            data={plans.map((plan) => ({
              ...plan,
              actions: (
                <>
<<<<<<< HEAD
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
=======
                  <Button variant="outlined" color="primary" className="edit-btn">
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" className="delete-btn">
>>>>>>> acd4fce (first commit)
                    Delete
                  </Button>
                </>
              )
            }))}
          />

          {/* Modal for adding a new plan */}
          <Modal open={open} onClose={handleClose}>
<<<<<<< HEAD
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg">
              <Typography variant="h6" className="text-lg font-semibold mb-4">Add New Plan</Typography>
=======
            <Box className="modal-content">
              <Typography variant="h6">Add New Plan</Typography>
>>>>>>> acd4fce (first commit)
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
<<<<<<< HEAD
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddPlan} 
                className="mt-4"
              >
=======
              <Button variant="contained" color="primary" onClick={handleAddPlan} className="modal-submit-btn">
>>>>>>> acd4fce (first commit)
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
