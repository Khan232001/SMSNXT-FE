import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Switch, TextField } from '@mui/material';
import Navbar from '../../components/Navbar'; 
import Sidebar from '../../components/AdminSidebar'; 

const SystemSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch system settings data
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/system-settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching system settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggleChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    try {
      const response = await fetch('/api/admin/system-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      if (response.ok) {
        alert('Settings updated successfully!');
      } else {
        alert('Failed to update settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  if (loading) {
    return <Typography>Loading settings...</Typography>;
  }

  return (
    <Box className="flex flex-col h-screen">
      {/* Navbar at the top */}
      <Navbar /> <br /><br />

      <Box className="flex flex-1 mt-12">
        {/* Sidebar on the left */}
        <Sidebar className="w-64 fixed h-full" />

        {/* Main content area */}
        <Box className="flex-grow ml-64 p-5 overflow-auto">
          <Typography variant="h4" className="mb-5">System Settings</Typography>

          {/* Settings Form */}
          <Box className="space-y-6">
            <Box>
              <Typography variant="h6">Enable Notifications</Typography>
              <Switch
                checked={settings.enableNotifications || false}
                onChange={() => handleToggleChange('enableNotifications')}
              />
            </Box>

            <Box>
              <Typography variant="h6">Website Title</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={settings.websiteTitle || ''}
                onChange={(e) => handleInputChange('websiteTitle', e.target.value)}
              />
            </Box>

            <Box>
              <Typography variant="h6">Default Language</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={settings.defaultLanguage || ''}
                onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
              />
            </Box>

            <Box>
              <Typography variant="h6">Maintenance Mode</Typography>
              <Switch
                checked={settings.maintenanceMode || false}
                onChange={() => handleToggleChange('maintenanceMode')}
              />
            </Box>

            <Box>
              <Typography variant="h6">API Key</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={settings.apiKey || ''}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
              />
            </Box>
          </Box><br></br>
          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            className="mt-8"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SystemSettings;
