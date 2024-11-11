import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { FaCheckCircle, FaTimesCircle, FaSyncAlt } from 'react-icons/fa';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import './Order.css';

const Order = () => {
  const orders = [
    {
      id: 1,
      customer: 'John Doe',
      plan: 'Premium Plan',
      amount: '$50',
      status: 'Pending',
      date: '2024-11-01',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      plan: 'Basic Plan',
      amount: '$20',
      status: 'Renewed',
      date: '2024-11-02',
    },
  ];

  return (
    <div className="order-layout">
      <Sidebar />
      <div className="order-main-content">
        <Navbar />

        {/* Order Table */}
        <div className="order-container"><br/>
          <h2 className="order-title">Subscription Orders</h2>
          <TableContainer component={Paper} className="order-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.plan}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FaCheckCircle />}
                        className="action-button"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<FaTimesCircle />}
                        className="action-button"
                      >
                        Reject
                      </Button>
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<FaSyncAlt />}
                        className="action-button"
                      >
                        Renew
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Order;
