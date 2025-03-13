import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/AdminSidebar';
import api, { login, fetchUser, updateUser, signup } from '../../utils/api'; // Import your axios utility

function Plans() {
  const [plans, setPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    smsLimit: '',
  });
  const [editPlan, setEditPlan] = useState(null); // State to hold the plan being edited

  // Fetch plans from the API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/payment/get-plans'); // Use the axios utility
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, [open]);

  // Handle adding a new plan
  const handleAddPlan = async () => {
    if (newPlan.name && newPlan.price && newPlan.smsLimit) {
      try {
        const response = await api.post('/payment/create-product-and-price', {
          planName: newPlan.name,
          price: parseFloat(newPlan.price),
          tokens: parseInt(newPlan.smsLimit, 10),
        });
        setPlans((prevPlans) => [...prevPlans, response.data]); // Add the new plan to the list
        setNewPlan({ name: '', price: '', smsLimit: '' }); // Reset the form
        setOpen(false); // Close the modal
      } catch (error) {
        console.error('Error creating plan:', error);
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  // Handle editing a plan
  const handleEditPlan = async () => {
    if (editPlan.name && editPlan.price && editPlan.smsLimit) {
      try {
        const response = await api.put('/payment/update-product', {
          planId: editPlan._id,
          newName: editPlan.name,
          newPrice: parseFloat(editPlan.price),
          newtokens: parseInt(editPlan.smsLimit, 10),
        });
        setPlans((prevPlans) =>
          prevPlans.map((plan) => (plan._id === editPlan._id ? response.data : plan))
        ); // Update the plan in the list
        setEditPlan(null); // Reset the edit state
      } catch (error) {
        console.error('Error updating plan:', error);
      }
    } else {
      alert('Please fill all the fields');
    }
  };

  // Handle deleting a plan
  const handleDeletePlan = async (planId) => {
    try {
      await api.delete(`/payment/delete-product/${planId}`);
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId)); // Remove the plan from the list
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  // Open the modal for adding a new plan
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Open the modal for editing a plan
  const handleEditOpen = (plan) => {
    setEditPlan(plan);
  };
  const handleEditClose = () => {
    setEditPlan(null);
  };

  return (
    <Box className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <Box className="flex flex-grow pt-20">
        {/* Sidebar on the left */}
        <Box className="w-1/5 min-h-screen bg-gray-200">
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
              plan_name: `${plan.name}`,
              price: `$${plan.price}`,
              sms_limit: `${plan.tokens}`,
              actions: (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="mr-2"
                    onClick={() => handleEditOpen(plan)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeletePlan(plan._id)}
                  >
                    Delete
                  </Button>
                </>
              ),
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

          {/* Modal for editing a plan */}
          <Modal open={!!editPlan} onClose={handleEditClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg">
              <Typography variant="h6" className="text-lg font-semibold mb-4">
                Edit Plan
              </Typography>
              <TextField
                label="Plan Name"
                value={editPlan?.name || ''}
                onChange={(e) => setEditPlan({ ...editPlan, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={editPlan?.price || ''}
                onChange={(e) => setEditPlan({ ...editPlan, price: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="SMS Limit"
                value={editPlan?.smsLimit || ''}
                onChange={(e) => setEditPlan({ ...editPlan, smsLimit: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditPlan}
                className="mt-4"
              >
                Save Changes
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default Plans;