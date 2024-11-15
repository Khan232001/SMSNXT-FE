import React from "react";
import { IconButton, Badge, InputBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Navbar = ({ toggleDrawer }) => {
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
          />
        </div>

        {/* Notifications and Profile Icons */}
        <div className="flex items-center">
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon className="text-gray-400" />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle className="text-gray-400" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
