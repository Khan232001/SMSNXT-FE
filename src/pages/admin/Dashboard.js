// src/pages/admin/Dashboard.js
import React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
<<<<<<< HEAD
import { FaUserAlt, FaRegMoneyBillAlt, FaFlag } from 'react-icons/fa';  
=======
import { FaUserAlt, FaRegMoneyBillAlt, FaFlag } from 'react-icons/fa';  // Replaced FaCampaign with FaFlag


>>>>>>> acd4fce (first commit)
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
  return (
<<<<<<< HEAD
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-12">
        <Navbar className="mb-5" />
        <div className="p-8">
          <Grid container spacing={3}>
            {/* Dashboard Overview */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} className="p-5 flex items-center">
                <FaUserAlt className="text-3xl mr-5 text-blue-600" />
                <div>
                  <Typography variant="h6">Total Customers</Typography>
                  <Typography variant="h4" className="text-blue-600">1,230</Typography>
=======
    <div style={{ display: "flex" }}>
      <Sidebar />  
      <div style={{ flex: 1, marginTop: 50 }}>
        <Navbar style={{ marginBottom: "20px" }} />  {/* Added margin-bottom to Navbar */}
        <div style={{ padding: "30px" }}>
          <Grid container spacing={3}>
            {/* Dashboard Overview */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} style={{ padding: "20px", display: "flex", alignItems: "center" }}>
                <FaUserAlt style={{ fontSize: 40, marginRight: "20px", color: "#1976d2" }} />
                <div>
                  <Typography variant="h6">Total Customers</Typography>
                  <Typography variant="h4" color="primary">1,230</Typography>
>>>>>>> acd4fce (first commit)
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
<<<<<<< HEAD
              <Paper elevation={3} className="p-5 flex items-center">
                <FaRegMoneyBillAlt className="text-3xl mr-5 text-green-600" />
                <div>
                  <Typography variant="h6">Total Revenue</Typography>
                  <Typography variant="h4" className="text-green-600">$50,000</Typography>
=======
              <Paper elevation={3} style={{ padding: "20px", display: "flex", alignItems: "center" }}>
                <FaRegMoneyBillAlt style={{ fontSize: 40, marginRight: "20px", color: "#388e3c" }} />
                <div>
                  <Typography variant="h6">Total Revenue</Typography>
                  <Typography variant="h4" color="primary">$50,000</Typography>
>>>>>>> acd4fce (first commit)
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
<<<<<<< HEAD
              <Paper elevation={3} className="p-5 flex items-center">
                <FaFlag className="text-3xl mr-5 text-yellow-500" />
                <div>
                  <Typography variant="h6">Active Campaigns</Typography>
                  <Typography variant="h4" className="text-yellow-500">35</Typography>
=======
              <Paper elevation={3} style={{ padding: "20px", display: "flex", alignItems: "center" }}>
                <FaFlag style={{ fontSize: 40, marginRight: "20px", color: "#fbc02d" }} />
                <div>
                  <Typography variant="h6">Active Campaigns</Typography>
                  <Typography variant="h4" color="primary">35</Typography>
>>>>>>> acd4fce (first commit)
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
<<<<<<< HEAD
              <Paper elevation={3} className="p-5 flex items-center">
                <FaRegMoneyBillAlt className="text-3xl mr-5 text-red-600" />
                <div>
                  <Typography variant="h6">Pending Payments</Typography>
                  <Typography variant="h4" className="text-red-600">$2,500</Typography>
=======
              <Paper elevation={3} style={{ padding: "20px", display: "flex", alignItems: "center" }}>
                <FaRegMoneyBillAlt style={{ fontSize: 40, marginRight: "20px", color: "#d32f2f" }} />
                <div>
                  <Typography variant="h6">Pending Payments</Typography>
                  <Typography variant="h4" color="primary">$2,500</Typography>
>>>>>>> acd4fce (first commit)
                </div>
              </Paper>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} sm={12} md={6}>
<<<<<<< HEAD
              <Paper elevation={3} className="p-5">
                <Typography variant="h6" className="mb-5">Revenue Growth (Last 6 Months)</Typography>
=======
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h6" style={{ marginBottom: "20px" }}>Revenue Growth (Last 6 Months)</Typography>
>>>>>>> acd4fce (first commit)
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
<<<<<<< HEAD
              <Paper elevation={3} className="p-5">
                <Typography variant="h6" className="mb-5">Customer Growth (Last 6 Months)</Typography>
=======
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h6" style={{ marginBottom: "20px" }}>Customer Growth (Last 6 Months)</Typography>
>>>>>>> acd4fce (first commit)
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="uv" fill="#8884d8" stroke="#8884d8" />
                    <Area type="monotone" dataKey="pv" fill="#82ca9d" stroke="#82ca9d" />
                  </AreaChart>
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
