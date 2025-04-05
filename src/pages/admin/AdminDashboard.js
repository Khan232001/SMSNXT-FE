import React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import Sidebar from "../../components/AdminSidebar";
import Navbar from "../../components/Navbar";
import { FaUserAlt, FaRegMoneyBillAlt, FaFlag } from "react-icons/fa";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4">
        <Sidebar />
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 mt-12 p-6">
        <Navbar />
        <div className="mt-6">
          <Grid container spacing={3}>
            {/* Dashboard Overview */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={6}
                className="p-6 flex items-center rounded-lg shadow-lg bg-white"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <FaUserAlt className="text-3xl text-blue-600" />
                </div>
                <div className="ml-4">
                  <Typography variant="h6" className="text-gray-700">
                    Total Customers
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    1,230
                  </Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={6}
                className="p-6 flex items-center rounded-lg shadow-lg bg-white"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                  <FaRegMoneyBillAlt className="text-3xl text-green-600" />
                </div>
                <div className="ml-4">
                  <Typography variant="h6" className="text-gray-700">
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    $50,000
                  </Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={6}
                className="p-6 flex items-center rounded-lg shadow-lg bg-white"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
                  <FaFlag className="text-3xl text-yellow-500" />
                </div>
                <div className="ml-4">
                  <Typography variant="h6" className="text-gray-700">
                    Active Campaigns
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    35
                  </Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={6}
                className="p-6 flex items-center rounded-lg shadow-lg bg-white"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                  <FaRegMoneyBillAlt className="text-3xl text-red-600" />
                </div>
                <div className="ml-4">
                  <Typography variant="h6" className="text-gray-700">
                    Pending Payments
                  </Typography>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    $2,500
                  </Typography>
                </div>
              </Paper>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} sm={12} md={6}>
              <Paper
                elevation={6}
                className="p-6 rounded-lg shadow-lg bg-white"
              >
                <Typography
                  variant="h6"
                  className="mb-5 font-semibold text-gray-800"
                >
                  Revenue Growth (Last 6 Months)
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
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Paper
                elevation={6}
                className="p-6 rounded-lg shadow-lg bg-white"
              >
                <Typography
                  variant="h6"
                  className="mb-5 font-semibold text-gray-800"
                >
                  Customer Growth (Last 6 Months)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      fill="#8884d8"
                      stroke="#8884d8"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      fill="#82ca9d"
                      stroke="#82ca9d"
                    />
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
