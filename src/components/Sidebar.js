import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { FaHome, FaUsers, FaRegMoneyBillAlt, FaFlag, FaClipboardList, FaCogs, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ open }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-4 transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} // Hide on small screens by default, show on medium and large screens
    >
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to="/admin/dashboard" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaHome className="text-xl mr-4" />
          <ListItemText primary="Dashboard Overview" />
        </ListItem>

        <Divider className="border-gray-600" />

        {/* Plan & Customer Management */}
        <ListItem button component={Link} to="/admin/plans" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaClipboardList className="text-xl mr-4" />
          <ListItemText primary="Plan & Customer Management" />
        </ListItem>

        {/* Subscription Order Handling */}
        <ListItem button component={Link} to="/admin/orders" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaClipboardList className="text-xl mr-4" />
          <ListItemText primary="Subscription Order Handling" />
        </ListItem>

        {/* Payment Processing */}
        <ListItem button component={Link} to="/admin/payments" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaRegMoneyBillAlt className="text-xl mr-4" />
          <ListItemText primary="Payment Processing" />
        </ListItem>

        {/* Sender ID Management */}
        <ListItem button component={Link} to="/admin/senderids" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaUsers className="text-xl mr-4" />
          <ListItemText primary="Sender ID Management" />
        </ListItem>

        {/* Campaign and Marketing Tools */}
        <ListItem button component={Link} to="/admin/campaigns" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaFlag className="text-xl mr-4" />
          <ListItemText primary="Campaign and Marketing Tools" />
        </ListItem>

        {/* Detailed Reporting */}
        <ListItem button component={Link} to="/admin/reports" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaChartLine className="text-xl mr-4" />
          <ListItemText primary="Detailed Reporting" />
        </ListItem>

        {/* Staff Management, Roles & Permissions */}
        <ListItem button component={Link} to="/admin/staff-management" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaUsers className="text-xl mr-4" />
          <ListItemText primary="Staff Management" />
        </ListItem>

        {/* SMS Gateway Configuration */}
        <ListItem button component={Link} to="/admin/sms-gateway" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaCogs className="text-xl mr-4" />
          <ListItemText primary="SMS Gateway Configuration" />
        </ListItem>

        {/* Website Management & System Settings */}
        <ListItem button component={Link} to="/admin/system-settings" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaCogs className="text-xl mr-4" />
          <ListItemText primary="Website Management & System Settings" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
