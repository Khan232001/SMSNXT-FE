// src/pages/admin/Payments.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Sidebar from '../../components/Sidebar'; // Ensure the sidebar is imported
import Navbar from '../../components/Navbar'; // Navbar for top layout
import Table from '../../components/Table'; // Reusing the Table component for display
<<<<<<< HEAD
=======
import './Payments.css'; // Custom CSS for styling
>>>>>>> acd4fce (first commit)

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payment transactions from the API
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/admin/payments'); // Update with real endpoint
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  return (
<<<<<<< HEAD
    <Box className="flex">
=======
    <Box className="payment-layout">
>>>>>>> acd4fce (first commit)
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
<<<<<<< HEAD
      <Box className="flex-grow p-5">
=======
      <Box className="payment-main-content">
>>>>>>> acd4fce (first commit)
        {/* Navbar */}
        <Navbar /> <br/>

        {/* Payment Processing Section */}
<<<<<<< HEAD
        <Paper className="p-5 mt-5">
          <Typography variant="h4" gutterBottom className="text-2xl font-semibold mb-5">
=======
        <Paper className="payment-container">
          <Typography variant="h4" gutterBottom className="payment-title">
>>>>>>> acd4fce (first commit)
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
