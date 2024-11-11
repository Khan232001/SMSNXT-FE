import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar'; // Assuming Navbar is in components folder
import Sidebar from '../../components/Sidebar'; // Assuming Sidebar is in components folder
import './Plans.css'; // Assuming a CSS file to style the page and components.

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

          {/* Table for displaying plans */}
          <Table
            columns={['Plan Name', 'Price', 'SMS Limit', 'Actions']}
            data={plans.map((plan) => ({
              ...plan,
              actions: (
                <>
                  <Button variant="outlined" color="primary" className="edit-btn">
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" className="delete-btn">
                    Delete
                  </Button>
                </>
              )
            }))}
          />

          {/* Modal for adding a new plan */}
          <Modal open={open} onClose={handleClose}>
            <Box className="modal-content">
              <Typography variant="h6">Add New Plan</Typography>
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
              <Button variant="contained" color="primary" onClick={handleAddPlan} className="modal-submit-btn">
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
