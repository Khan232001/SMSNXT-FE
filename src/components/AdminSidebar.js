import React from 'react';
import { List, ListItem, ListItemText, Divider, styled } from '@mui/material';
import { FaHome, FaUsers, FaRegMoneyBillAlt, FaFlag, FaClipboardList, FaCogs, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ open }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 py-4 px-4 transition-transform duration-300 shadow-xl rounded-r-lg overflow-y-auto hide-scrollbar ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <List className="space-y-0">
        {/* Dashboard */}
        <ListItem
          button
          component={Link}
          to="/admin/dashboard"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaHome className="text-xl mr-4" />
          <ListItemText primary="Dashboard Overview" />
        </ListItem>

        <Divider className="border-gray-600" />

        {/* Plan & Customer Management */}
        <ListItem
          button
          component={Link}
          to="/admin/plans"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaClipboardList className="text-xl mr-4" />
          <ListItemText primary="Plan & Customer Management" />
        </ListItem>

        {/* Subscription Order Handling */}
        <ListItem
          button
          component={Link}
          to="/admin/orders"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaClipboardList className="text-xl mr-4" />
          <ListItemText primary="Subscription Order Handling" />
        </ListItem>

        {/* Payment Processing */}
        <ListItem
          button
          component={Link}
          to="/admin/payments"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaRegMoneyBillAlt className="text-xl mr-4" />
          <ListItemText primary="Payment Processing" />
        </ListItem>

        {/* Sender ID Management */}
        <ListItem
          button
          component={Link}
          to="/admin/senderids"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaUsers className="text-xl mr-4" />
          <ListItemText primary="Sender ID Management" />
        </ListItem>

        {/* Campaign and Marketing Tools */}
        <ListItem
          button
          component={Link}
          to="/admin/campaigns"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaFlag className="text-xl mr-4" />
          <ListItemText primary="Campaign and Marketing Tools" />
        </ListItem>

        {/* Detailed Reporting */}
        <ListItem
          button
          component={Link}
          to="/admin/reports"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaChartLine className="text-xl mr-4" />
          <ListItemText primary="Detailed Reporting" />
        </ListItem>

        {/* Campaign Management */}
        <ListItem
          button
          component={Link}
          to="/admin/campaign-management"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
           <FaFlag className="text-xl mr-4" />
          <ListItemText primary="Campaign Management" />
        </ListItem>

        {/* Staff Management */}
        <ListItem
          button
          component={Link}
          to="/admin/staff-management"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaUsers className="text-xl mr-4" />
          <ListItemText primary="Staff Management" />
        </ListItem>

        {/* SMS Gateway Configuration */}
        <ListItem
          button
          component={Link}
          to="/admin/sms-gateway"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaCogs className="text-xl mr-4" />
          <ListItemText primary="SMS Gateway Configuration" />
        </ListItem>

        {/* Website Management */}
        <ListItem
          button
          component={Link}
          to="/admin/system-settings"
          className="flex items-center hover:bg-gray-700 hover:scale-[1.05] transition-transform duration-200 ease-in-out p-2 rounded-lg"
        >
          <FaCogs className="text-xl mr-4" />
          <ListItemText primary="Website Management & System Settings" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

