import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Message, AccountCircle, History, CreditCard,
  Campaign, Contacts, BarChart, Tag, People,
  Dashboard
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation(); // Get the current URL
  const routes = [
    "/dashboard",
    "/messaging",
    "/sender-id-management",
    "/subscription-plans",
    "/order-recharge-history",
    "/campaign-management",
    "/contact-management",
    "/tags-management",
    "/contact-management", // Duplicate route, fix if necessary
    "/reporting",
  ];

  // Set the correct tab index based on the current route
  const [selectedTab, setSelectedTab] = useState(routes.indexOf(location.pathname));
  // console.log(routes[selectedTab],"selected tab")

  useEffect(() => {
    setSelectedTab(routes.indexOf(location.pathname));
  }, [location.pathname]); // Update when URL changes

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#263238",
        paddingTop: "10px",
        color: "white",
        overflowY: "auto",
        position: "fixed",
        top: 0,
        left: 0
      }}
    >
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={selectedTab !== -1 ? selectedTab : 0} // Prevent invalid index
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab icon={<Dashboard />} label="Dashboard" component={Link} to="/dashboard" />
        <Tab icon={<Message />} label="Quick Messaging" component={Link} to="/messaging" />
        <Tab icon={<AccountCircle />} label="Sender ID" component={Link} to="/sender-id-management" />
        <Tab icon={<CreditCard />} label="Subscription Plans" component={Link} to="/subscription-plans" />
        <Tab icon={<History />} label="Order & Recharge" component={Link} to="/order-recharge-history" />
        <Tab icon={<Campaign />} label="Campaign" component={Link} to="/campaign-management" />
        <Tab icon={<Contacts />} label="Contact Management" component={Link} to="/contact-management" />
        <Tab icon={<Tag />} label="Manage Tags" component={Link} to="/tags-management" />
        {/* <Tab icon={<People />} label="Manage Contacts" component={Link} to="/contact-management" /> */}
        <Tab icon={<BarChart />} label="Reporting" component={Link} to="/reporting" />
      </Tabs>
    </Box>
  );
};

export default Sidebar;
