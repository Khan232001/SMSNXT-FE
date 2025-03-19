import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  Message,
  AccountCircle,
  History,
  CreditCard,
  Campaign,
  Contacts,
  BarChart,
  Tag,
  People,
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Function to handle parent menu click and toggle the submenu
  const handleParentClick = (item) => {
    if (item.children) {
      setOpenMenus((prev) => ({
        ...prev,
        [item.to]: !prev[item.to], // Toggle the menu visibility
      }));
    }
  };

  // useEffect to check when the path changes and open the corresponding submenu
  useEffect(() => {
    const openSubmenu = menuItems.find((item) => location.pathname.includes(item.to));
    if (openSubmenu && openSubmenu.children) {
      setOpenMenus((prev) => ({
        ...prev,
        [openSubmenu.to]: true, // Open the submenu of the current route
      }));
    } else {
      setOpenMenus({}); // Close all submenus if no match
    }
  }, [location.pathname]); // Run when pathname changes

  const menuItems = [
    { to: "/dashboard", icon: <Dashboard />, label: "Dashboard" },
    {
      to: "/messaging",
      icon: <Message />,
      label: "Quick Messaging",
      children: [
        { to: "/messaging/templates", label: "Templates" },
        { to: "/messaging/scheduled", label: "Scheduled Messages" },
      ],
    },
    {
      to: "/sender-id-management",
      icon: <AccountCircle />,
      label: "Sender ID",
      children: [
        { to: "/sender/list", label: "My Senders" },
        { to: "/sender/register", label: "Register New" },
      ],
    },
    {
      to: "/subscription-plans",
      icon: <CreditCard />,
      label: "Subscription Plans",
      children: [
        { to: "/subscription", label: "Active Plans" },
        { to: "/subscription/upgrade", label: "Upgrade Plan" },
        { to: "/subscription/billing", label: "Billing" },
      ],
    },
    {
      to: "/order-recharge-history",
      icon: <History />,
      label: "Order & Recharge",
      children: [
        { to: "/order/credits", label: "Purchase Credits" },
        { to: "/order/history", label: "Order History" },
      ],
    },
    {
      to: "/campaign-management",
      icon: <Campaign />,
      label: "Campaign",
      children: [
        { to: "/campaign", label: "Active Campaigns" },
        { to: "/campaign/new", label: "Create New" },
        { to: "/campaign/schedule", label: "Schedule" },
      ],
    },
    {
      to: "/contact-management",
      icon: <Contacts />,
      label: "Contact Management",
      children: [
        { to: "/contact-management", label: "Overview" },
        { to: "/contact-management/import", label: "Import/Export" },
      ],
    },
    {
      to: "/tags-management",
      icon: <Tag />,
      label: "Manage Tags",
      children: [
        { to: "/tags", label: "All Tags" },
        { to: "/tags/create", label: "Create Tag" },
      ],
    },
    {
      to: "/reporting",
      icon: <BarChart />,
      label: "Reporting",
      children: [
        { to: "/reporting", label: "Dashboard" },
        { to: "/reporting/delivery", label: "Delivery Reports" },
        { to: "/reporting/analytics", label: "Analytics" },
      ],
    },
  ];

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
        left: 0,
      }}
    >
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.to}>
            <ListItemButton
              component={Link}
              to={item.to} // Navigate to the parent route
              onClick={() => handleParentClick(item)} // Handle parent click and toggle submenu
              selected={location.pathname === item.to}
              sx={{
                color: "white",
                "&.Mui-selected": { backgroundColor: "#455A64" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.children ? openMenus[item.to] ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItemButton>

            {/* Submenu Links */}
            {item.children && (
              <Collapse in={openMenus[item.to]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((subItem) => (
                    <ListItemButton
                      key={subItem.to}
                      component={Link}
                      to={subItem.to}
                      selected={location.pathname === subItem.to}
                      sx={{
                        pl: 4,
                        color: "white",
                        "&.Mui-selected": { backgroundColor: "#37474F" },
                      }}
                    >
                      <ListItemText primary={subItem.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
