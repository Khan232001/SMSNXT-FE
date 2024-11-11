// src/components/Sidebar.js
import React from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { FaHome, FaUsers, FaRegMoneyBillAlt, FaFlag } from 'react-icons/fa';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <List>
        <ListItem button className="sidebar-list-item">
          <FaHome className="sidebar-icon" />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider className="sidebar-divider" />
        <ListItem button className="sidebar-list-item">
          <FaUsers className="sidebar-icon" />
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button className="sidebar-list-item">
          <FaRegMoneyBillAlt className="sidebar-icon" />
          <ListItemText primary="Revenue" />
        </ListItem>
        <ListItem button className="sidebar-list-item">
          <FaFlag className="sidebar-icon" />
          <ListItemText primary="Campaigns" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
