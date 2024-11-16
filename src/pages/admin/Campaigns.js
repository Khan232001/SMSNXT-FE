import React, { useState } from "react";
import { Grid, Paper, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import { FaRegMoneyBillAlt, FaUsers, FaMailBulk } from 'react-icons/fa';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/AdminSidebar";

const campaignData = [
  { name: 'Campaign 1', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Campaign 2', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Campaign 3', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Campaign 4', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Campaign 5', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Campaign 6', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Campaign 7', uv: 3490, pv: 4300, amt: 2100 },
];

const Campaigns = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [newCampaignName, setNewCampaignName] = useState('');

  const handleCampaignCreate = () => {
    console.log(`Creating new campaign: ${newCampaignName}`);
  };

  return (
    <div className="flex">
      {/* Sidebar should have a fixed width and should not overlap content */}
      <Sidebar />
      
      <div className="flex-1 ml-[240px]"> {/* Adjust left margin to match sidebar width */}
        <Navbar /> <br/> <br/>
        
        <div className="p-8 mt-5">
          <Grid container spacing={3}>
            {/* Dashboard Overview */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="p-5 flex items-center shadow-lg">
                <FaUsers className="text-4xl mr-5 text-blue-600" />
                <div>
                  <Typography variant="h6">Active Campaigns</Typography>
                  <Typography variant="h4" color="primary">35</Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="p-5 flex items-center shadow-lg">
                <FaMailBulk className="text-4xl mr-5 text-green-600" />
                <div>
                  <Typography variant="h6">Total Messages Sent</Typography>
                  <Typography variant="h4" color="primary">500,000</Typography>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} className="p-5 flex items-center shadow-lg">
                <FaRegMoneyBillAlt className="text-4xl mr-5 text-red-600" />
                <div>
                  <Typography variant="h6">Revenue from Campaigns</Typography>
                  <Typography variant="h4" color="primary">$120,000</Typography>
                </div>
              </Paper>
            </Grid>

            {/* Campaign Creation */}
            <Grid item xs={12} sm={12} md={6}>
              <Paper elevation={3} className="p-5">
                <Typography variant="h6" className="mb-5">Create New Campaign</Typography>
                <TextField
                  label="Campaign Name"
                  variant="outlined"
                  fullWidth
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  className="mb-5"
                />
                <FormControl fullWidth className="mb-5">
                  <InputLabel>Plan Type</InputLabel>
                  <Select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    label="Plan Type"
                  >
                    <MenuItem value="basic">Basic Plan</MenuItem>
                    <MenuItem value="premium">Premium Plan</MenuItem>
                    <MenuItem value="enterprise">Enterprise Plan</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleCampaignCreate} className="mt-5">
                  Create Campaign
                </Button>
              </Paper>
            </Grid>

            {/* Campaign Performance Chart */}
            <Grid item xs={12} sm={12} md={6}>
              <Paper elevation={3} className="p-5">
                <Typography variant="h6" className="mb-5">Campaign Performance</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignData}>
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

          {/* Reporting Section */}
          <Box mt={4}>
            <Typography variant="h5" className="mb-5">Detailed Reporting</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className="p-5">
                  <Typography variant="h6">Quick SMS Report</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className="p-5">
                  <Typography variant="h6">Group SMS Report</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
