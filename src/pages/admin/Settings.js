import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

function Settings() {
  const [settings, setSettings] = useState({
    siteName: '',
    adminEmail: '',
    contactNumber: ''
  });

  useEffect(() => {
    // Fetch settings data
    const fetchSettings = async () => {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSave = () => {
    // Logic to save settings (API call)
    console.log('Save settings', settings);
  };

  return (
    <Box>
      <Typography variant="h4">System & Website Settings</Typography>
      <TextField
        label="Site Name"
        value={settings.siteName}
        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Admin Email"
        value={settings.adminEmail}
        onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contact Number"
        value={settings.contactNumber}
        onChange={(e) => setSettings({ ...settings, contactNumber: e.target.value })}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
        Save Settings
      </Button>
    </Box>
  );
}

export default Settings;
