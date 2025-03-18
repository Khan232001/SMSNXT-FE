import React, { useState } from "react";
import {
  IconButton,
  Badge,
  InputBase,
  Popover,
  Menu,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleDrawer }) => {
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const routes = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/contact", label: "Contact" },
    { path: "/pricing", label: "Pricing" },
    { path: "/subscription-plans", label: "Subscription Plans" },
    { path: "/order-recharge-history", label: "Order Recharge History" },
    { path: "/campaign-management", label: "Campaign Management" },
    { path: "/contact-management", label: "Contact Management" },
    { path: "/tags-management", label: "Tags Management" },
    { path: "/reporting", label: "Reporting" },
    { path: "/quick-group-messaging", label: "Quick Group Messaging" },
    { path: "/sender-id-management", label: "Sender ID Management" },
  ];

  const navigate = useNavigate();

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear local storage data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
    setProfileAnchorEl(null); // Close the profile menu
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = routes.filter((route) =>
      route.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRoutes(filtered);
    setOpenDropdown(filtered.length > 0);
  };

  const handleSearchClick = () => {
    setOpenDropdown(true);
  };

  const handleRouteSelect = (routePath) => {
    navigate(routePath);
    setSearchTerm("");
    setFilteredRoutes([]);
    setOpenDropdown(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 md:px-6 py-2 md:py-4">
      <div className="flex items-center justify-between">
        {/* Left - Title */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleDrawer} className="sm:hidden">
            <MenuIcon className="text-gray-600" />
          </button>
          <h6 className="font-bold text-lg md:text-xl text-gray-800">Dashboard</h6>
        </div>

        {/* Center - Search Input */}
        <div className="relative flex-grow max-w-[300px] mx-4">
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            className="w-full pl-10 pr-2 py-2 bg-gray-100 rounded-lg text-gray-800 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
          />
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {openDropdown && filteredRoutes.length > 0 && (
            <div className="absolute w-full bg-white shadow-lg mt-1 rounded-md max-h-60 overflow-y-auto z-10">
              <List>
                {filteredRoutes.map((route) => (
                  <ListItem
                    button
                    key={route.path}
                    onClick={() => handleRouteSelect(route.path)}
                  >
                    <ListItemText primary={route.label} />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>

        {/* Right - Notifications and Profile */}
        <div className="flex items-center space-x-2">
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon className="text-gray-600" />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle className="text-gray-600" />
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
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
