import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { FaHome, FaUsers, FaRegMoneyBillAlt, FaFlag } from 'react-icons/fa';

const Sidebar = ({ open }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-4 transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} // Hide on small screens by default, show on medium and large screens
    >
      <List>
        {/* Dashboard */}
        <ListItem button className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaHome className="text-xl mr-4" />
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Divider className="border-gray-600" />

        {/* Customers */}
        <ListItem button className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaUsers className="text-xl mr-4" />
          <ListItemText primary="Customers" />
        </ListItem>

        {/* Revenue */}
        <ListItem button className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaRegMoneyBillAlt className="text-xl mr-4" />
          <ListItemText primary="Revenue" />
        </ListItem>

        {/* Campaigns */}
        <ListItem button className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaFlag className="text-xl mr-4" />
          <ListItemText primary="Campaigns" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
