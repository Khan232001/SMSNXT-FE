import React from 'react';
import { Paper, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import Sidebar from '../../layout/Sidebar';
import Navbar from '../../layout/Navbar';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Resources from '../../components/Resources';

// Placeholder data for charts
const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

// Placeholder user data
const user = {
  name: 'John Doe',
  phoneNumber: '+1234567890',
  credits: 120,
  selectedPlan: 'Pro Plan',
};

// Placeholder message stats
const messageStats = [
  { id: 1, incoming: 500, sent: 450, optedIn: 300, optedOut: 50 },
];

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div className="flex">
  
      <Sidebar />

      <div className="flex-1  ml-60">

        <Navbar className="mb-5" />

        <div className="p-8 mt-6">
          <Grid container spacing={3} alignItems="center">
            {/* User Greeting */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className="text-blue-600 font-bold">
                Hi, {user.name}!
              </Typography>
            </Grid>

            {/* User Details */}
            <Grid item xs={12} md={6} className="text-right">
              <Typography variant="body1" className="text-gray-600">
                Phone: {user.phoneNumber}
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Credits: {user.credits}
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Plan: {user.selectedPlan}
              </Typography>
            </Grid>
          </Grid>

          {/* Message Stats Table */}
          <Box className="mt-6">
            <Paper elevation={3} className="p-5 shadow-md rounded-lg bg-blue-50">
              <Typography variant="h6" className="mb-3 text-xl font-semibold text-blue-600">
                Message Statistics
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead style={{ backgroundColor: '#e0f7fa' }}>
                    <TableRow>
                      <TableCell>Incoming Messages</TableCell>
                      <TableCell>Sent Messages</TableCell>
                      <TableCell>Contacts Opted-In</TableCell>
                      <TableCell>Contacts Opted-Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {messageStats.map((stat) => (
                      <TableRow key={stat.id}>
                        <TableCell>{stat.incoming}</TableCell>
                        <TableCell>{stat.sent}</TableCell>
                        <TableCell>{stat.optedIn}</TableCell>
                        <TableCell>{stat.optedOut}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* Message Statistics Chart */}
          <Box className="mt-8">
            <Paper elevation={3} className="p-5 shadow-md rounded-lg bg-white">
              <Typography variant="h6" className="mb-3 text-xl font-semibold text-blue-600">
                Message Statistics (Chart)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
          <Resources/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
