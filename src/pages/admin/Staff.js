import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Table from '../components/Table';

function Staff() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    // Fetch staff data
    const fetchStaff = async () => {
      const response = await fetch('/api/admin/staff');
      const data = await response.json();
      setStaff(data);
    };
    fetchStaff();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Manage Staff</Typography>
      <Table columns={['Name', 'Role', 'Email', 'Status']} data={staff} />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Add New Staff</Button>
    </Box>
  );
}

export default Staff;
