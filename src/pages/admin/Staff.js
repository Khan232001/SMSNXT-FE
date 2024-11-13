import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
=======
import { Box, Typography, Button } from '@mui/material';
>>>>>>> acd4fce (first commit)
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
<<<<<<< HEAD
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Manage Staff</h1>
      
      {/* Table Component */}
      <Table columns={['Name', 'Role', 'Email', 'Status']} data={staff} />

      {/* Button to Add New Staff */}
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
        Add New Staff
      </button>
    </div>
=======
    <Box>
      <Typography variant="h4" gutterBottom>Manage Staff</Typography>
      <Table columns={['Name', 'Role', 'Email', 'Status']} data={staff} />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Add New Staff</Button>
    </Box>
>>>>>>> acd4fce (first commit)
  );
}

export default Staff;
