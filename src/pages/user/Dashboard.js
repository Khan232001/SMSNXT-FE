// src/pages/admin/Dashboard.js
import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Sidebar from "../../components/UserSidebar"; 
import Navbar from "../../components/UserNavbar"; 
import { FaUserAlt, FaRegMoneyBillAlt, FaFlag, FaTasks } from 'react-icons/fa';

// Placeholder data for the charts
const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const Dashboard = () => {
  // State variables for data (temporarily hardcoded)
  const [totalUsers, setTotalUsers] = useState(1230);
  const [totalRevenue, setTotalRevenue] = useState(50000);
  const [activeCampaigns, setActiveCampaigns] = useState(35);
  const [pendingPayments, setPendingPayments] = useState(2500);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 mt-12 ml-60"> {/* Added margin-left for the sidebar */}
        {/* Navbar */}
        <Navbar className="mb-5" />  

        <div className="p-8 mt-6"> {/* Added margin-top for spacing */}
          <Grid container spacing={3}>
            {/* Dashboard Overview */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} className="p-5 flex items-center shadow-md rounded-lg bg-white">
                <FaUserAlt className="text-3xl mr-5 text-blue-600" />
                <div>
                  <Typography variant="h6" className="text-sm font-semibold text-gray-600">Total Users</Typography>
                  <Typography variant="h4" className="text-blue-600 font-bold">{totalUsers}</Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} className="p-5 flex items-center shadow-md rounded-lg bg-white">
                <FaRegMoneyBillAlt className="text-3xl mr-5 text-green-600" />
                <div>
                  <Typography variant="h6" className="text-sm font-semibold text-gray-600">Total Revenue</Typography>
                  <Typography variant="h4" className="text-green-600 font-bold">${totalRevenue}</Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} className="p-5 flex items-center shadow-md rounded-lg bg-white">
                <FaFlag className="text-3xl mr-5 text-yellow-500" />
                <div>
                  <Typography variant="h6" className="text-sm font-semibold text-gray-600">Active Campaigns</Typography>
                  <Typography variant="h4" className="text-yellow-500 font-bold">{activeCampaigns}</Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} className="p-5 flex items-center shadow-md rounded-lg bg-white">
                <FaTasks className="text-3xl mr-5 text-red-600" />
                <div>
                  <Typography variant="h6" className="text-sm font-semibold text-gray-600">Pending Payments</Typography>
                  <Typography variant="h4" className="text-red-600 font-bold">${pendingPayments}</Typography>
                </div>
              </Paper>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} sm={12} md={6}>
              <Paper elevation={3} className="p-5 shadow-md rounded-lg bg-white">
                <Typography variant="h6" className="mb-5 text-xl font-semibold text-gray-600">Revenue Growth (Last 6 Months)</Typography>
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
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Paper elevation={3} className="p-5 shadow-md rounded-lg bg-white">
                <Typography variant="h6" className="mb-5 text-xl font-semibold text-gray-600">User Growth (Last 6 Months)</Typography>
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
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
