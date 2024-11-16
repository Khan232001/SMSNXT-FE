// src/pages/admin/Payments.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Sidebar from '../../components/AdminSidebar'; 
import Navbar from '../../components/Navbar'; 
import Table from '../../components/Table';

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payment transactions from the API
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/admin/payments'); // Replace with real endpoint
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

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

        {/* Payment Processing Section */}
        <Paper className="p-5 mt-5">
          <Typography variant="h4" gutterBottom className="text-2xl font-semibold mb-5">
            Payment Processing
          </Typography>

          {/* Payment Table */}
          <Table 
            columns={['Payment ID', 'Customer Name', 'Amount', 'Date', 'Status', 'Payment Method']} 
            data={payments.map(payment => [
              payment.id, 
              payment.customerName, 
              `$${payment.amount}`, 
              payment.date, 
              payment.status, 
              payment.method // Assuming 'method' is available in the API data
            ])} 
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default Payments;
