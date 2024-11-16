import React, { useState } from "react";
import { IconButton, Badge, InputBase, Popover, Menu, MenuItem, Typography, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleDrawer }) => {
  // State for the notification popover
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  
  // State for the search input and filtered routes
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false); // State to manage dropdown visibility

  // Routes to be displayed in the dropdown
  const routes = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/contact", label: "Contact" },
    { path: "/pricing", label: "Pricing" },
    { path: "/subscription-plans", label: "Subscription Plans" },
    { path: "/order-recharge-history", label: "Order Recharge History" },
    { path: "/campaign-management", label: "Campaign Management" },
    { path: "/contact-management", label: "Contact Management" },
    { path: "/reporting", label: "Reporting" },
    { path: "/quick-group-messaging", label: "Quick Group Messaging" },
    { path: "/sender-id-management", label: "Sender ID Management" },
  ];

  // React Router's navigate hook
  const navigate = useNavigate();

  // Handle notification popover
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  // Handle profile menu
  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  // Handle search input change and filter routes
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter routes based on the search term (case insensitive)
    const filtered = routes.filter(route =>
      route.label.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredRoutes(filtered);
    setOpenDropdown(filtered.length > 0); // Open dropdown only if there are filtered results
  };

  // Handle clicking on search input to toggle dropdown
  const handleSearchClick = () => {
    setOpenDropdown(true); // Open dropdown on input click
  };

  // Handle route selection from the dropdown
  const handleRouteSelect = (routePath) => {
    navigate(routePath);
    setSearchTerm(""); // Clear search after navigation
    setFilteredRoutes([]); // Clear the filtered routes
    setOpenDropdown(false); // Close the dropdown
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-none z-50 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h6 className="font-bold text-lg text-black">Dashboard</h6>
        </div>

        {/* Center - Search Input */}
        <div className="relative w-full max-w-[300px] bg-gray-100 rounded-lg mr-4 ml-4">
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <MenuIcon />
          </div>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            className="pl-10 pr-2 py-2 w-full"
            value={searchTerm}
            onChange={handleSearchChange} // Handle input change
            onClick={handleSearchClick} // Show dropdown on input click
          />

          {/* Dropdown for filtered routes */}
          {openDropdown && filteredRoutes.length > 0 && (
            <div className="absolute w-full bg-white shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
              <List>
                {filteredRoutes.map((route) => (
                  <ListItem
                    button
                    key={route.path}
                    onClick={() => handleRouteSelect(route.path)} // Handle route selection
                  >
                    <ListItemText primary={route.label} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>

        {/* Notifications and Profile Icons */}
        <div className="flex items-center">
          {/* Notification Icon */}
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon className="text-gray-400" />
            </Badge>
          </IconButton>

          {/* Profile Icon */}
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle className="text-gray-400" />
          </IconButton>
        </div>
      </div>

      {/* Notification Popover */}
      <Popover
        open={Boolean(notificationAnchorEl)}
        anchorEl={notificationAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="p-4">
          <Typography variant="h6">Notifications</Typography>
          <MenuItem onClick={handleNotificationClose}>New Message</MenuItem>
          <MenuItem onClick={handleNotificationClose}>Server Downtime Alert</MenuItem>
          <MenuItem onClick={handleNotificationClose}>Scheduled Maintenance</MenuItem>
        </div>
      </Popover>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
        <MenuItem onClick={handleProfileClose}>Log Out</MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
