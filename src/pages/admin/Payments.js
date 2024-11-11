// src/pages/admin/Payments.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Sidebar from '../../components/Sidebar'; // Ensure the sidebar is imported
import Navbar from '../../components/Navbar'; // Navbar for top layout
import Table from '../../components/Table'; // Reusing the Table component for display
import './Payments.css'; // Custom CSS for styling

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
    <Box className="payment-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box className="payment-main-content">
        {/* Navbar */}
        <Navbar /> <br/>

        {/* Payment Processing Section */}
        <Paper className="payment-container">
          <Typography variant="h4" gutterBottom className="payment-title">
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
