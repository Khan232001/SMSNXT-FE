import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { FaHome, FaUsers, FaRegMoneyBillAlt, FaFlag, FaClipboardList, FaCogs, FaBook, FaChartLine, FaTag, FaHistory } from 'react-icons/fa';

const Sidebar = ({ open }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-4 transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`} // Hide on small screens by default, show on medium and large screens
    >
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to="/" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaHome className="text-xl mr-4" />
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Divider className="border-gray-600" />

        {/* Quick & Group Messaging */}
        <ListItem button component={Link} to="/quick-group-messaging" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaClipboardList className="text-xl mr-4" />
          <ListItemText primary="Quick & Group Messaging" />
        </ListItem>

        {/* Sender ID Management */}
        <ListItem button component={Link} to="/sender-id-management" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaTag className="text-xl mr-4" />
          <ListItemText primary="Sender ID Management" />
        </ListItem>

        {/* Subscription Plans */}
        <ListItem button component={Link} to="/subscription-plans" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaRegMoneyBillAlt className="text-xl mr-4" />
          <ListItemText primary="Subscription Plans" />
        </ListItem>

        {/* Order & Recharge History */}
        <ListItem button component={Link} to="/order-recharge-history" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaHistory className="text-xl mr-4" />
          <ListItemText primary="Order & Recharge History" />
        </ListItem>

        <Divider className="border-gray-600" />

    
        {/* Campaign Management */}
        <ListItem button component={Link} to="/campaign-management" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaFlag className="text-xl mr-4" />
          <ListItemText primary="Campaign Management" />
        </ListItem>

        {/* Contact Management */}
        <ListItem button component={Link} to="/contact-management" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaUsers className="text-xl mr-4" />
          <ListItemText primary="Contact Management" />
        </ListItem>

        {/* Reporting */}
        <ListItem button component={Link} to="/reporting" className="flex items-center hover:bg-gray-700 p-2 rounded-md mb-2">
          <FaChartLine className="text-xl mr-4" />
          <ListItemText primary="Reporting" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
