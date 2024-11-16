import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Switch, MenuItem } from '@mui/material';
import Navbar from '../../components/Navbar'; 
import Sidebar from '../../components/AdminSidebar'; 

const SmsGateway = () => {
  const [gateways, setGateways] = useState([]);
  const [newGateway, setNewGateway] = useState({
    name: '',
    apiUrl: '',
    apiKey: '',
    enabled: false,
  });

  useEffect(() => {
    // Fetch existing SMS gateways
    const fetchGateways = async () => {
      try {
        const response = await fetch('/api/admin/sms-gateway');
        const data = await response.json();
        setGateways(data);
      } catch (error) {
        console.error('Error fetching SMS gateways:', error);
      }
    };
    fetchGateways();
  }, []);

  const handleInputChange = (key, value) => {
    setNewGateway((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleToggleEnabled = (id) => {
    setGateways((prev) =>
      prev.map((gateway) =>
        gateway.id === id ? { ...gateway, enabled: !gateway.enabled } : gateway
      )
    );
  };

  const handleAddGateway = async () => {
    try {
      const response = await fetch('/api/admin/sms-gateway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGateway),
      });

      if (response.ok) {
        const createdGateway = await response.json();
        setGateways((prev) => [...prev, createdGateway]);
        setNewGateway({ name: '', apiUrl: '', apiKey: '', enabled: false });
        alert('Gateway added successfully!');
      } else {
        alert('Failed to add gateway. Please try again.');
      }
    } catch (error) {
      console.error('Error adding SMS gateway:', error);
    }
  };

  return (
    <Box className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar /> <br /> <br />

      <Box className="flex flex-1 mt-12">
        {/* Sidebar */}
        <Sidebar className="w-64 fixed h-full" />

        {/* Main content area */}
        <Box className="flex-grow ml-64 p-5 overflow-auto">
          <Typography variant="h4" className="mb-5">SMS Gateway Management</Typography>

          {/* Add New Gateway Form */}
          <Box className="mb-10 p-5 border rounded space-y-4">
            <Typography variant="h6">Add New Gateway</Typography>
            <TextField
              fullWidth
              label="Gateway Name"
              variant="outlined"
              value={newGateway.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <TextField
              fullWidth
              label="API URL"
              variant="outlined"
              value={newGateway.apiUrl}
              onChange={(e) => handleInputChange('apiUrl', e.target.value)}
            />
            <TextField
              fullWidth
              label="API Key"
              variant="outlined"
              value={newGateway.apiKey}
              onChange={(e) => handleInputChange('apiKey', e.target.value)}
            />
            <Box className="flex items-center space-x-3">
              <Typography>Enabled:</Typography>
              <Switch
                checked={newGateway.enabled}
                onChange={(e) => handleInputChange('enabled', e.target.checked)}
              />
            </Box>
            <Button variant="contained" color="primary" onClick={handleAddGateway}>
              Add Gateway
            </Button>
          </Box>

          {/* Existing Gateways Table */}
          <Box>
            <Typography variant="h6" className="mb-4">Existing Gateways</Typography>
            {gateways.map((gateway) => (
              <Box key={gateway.id} className="p-4 mb-4 border rounded flex justify-between items-center">
                <Box>
                  <Typography variant="body1"><strong>Name:</strong> {gateway.name}</Typography>
                  <Typography variant="body2"><strong>API URL:</strong> {gateway.apiUrl}</Typography>
                  <Typography variant="body2"><strong>Status:</strong> {gateway.enabled ? 'Enabled' : 'Disabled'}</Typography>
                </Box>
                <Switch
                  checked={gateway.enabled}
                  onChange={() => handleToggleEnabled(gateway.id)}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SmsGateway;
