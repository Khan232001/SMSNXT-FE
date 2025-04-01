import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import {
  CalendarMonth,
  ChevronLeft,
  Mail,
  Message,
  People,
  History,
  Folder,
  PieChart,
  Settings,
  PauseCircleOutline,
  HighlightOff,
  Archive,
  ChatBubbleOutline,
  FolderOpen,
  AssignmentTurnedIn,
  VisibilityOff,
  CheckCircleOutline,
  Dashboard,
  Campaign,
  RocketLaunch,
} from "@mui/icons-material";
import { useState } from "react";

const sidebarItems = [
  { label: "Dashboard", icon: <Dashboard />, href: "/admin/dashboard" },
  { label: "Plan & Customers", icon: <People />, href: "/admin/plans" },
  { label: "Orders", icon: <Folder />, href: "/admin/orders" },
  { label: "Payments", icon: <PieChart />, href: "/admin/payments" },
  { label: "Sender IDs", icon: <People />, href: "/admin/senderids" },
  { label: "Campaigns", icon: <Campaign />, href: "/admin/campaigns" },
  { label: "Reports", icon: <PieChart />, href: "/admin/reports" },
  { label: "Campaign Management", icon: <Folder />, href: "/admin/campaign-management" },
  { label: "Staff", icon: <People />, href: "/admin/staff-management" },
  { label: "SMS Gateway", icon: <Settings />, href: "/admin/sms-gateway" },
  { label: "System Settings", icon: <Settings />, href: "/admin/system-settings" },
  { label: "Manage Contacts", icon: <People />, href: "/admin/contact-management" },
  { label: "Manage Tags", icon: <Folder />, href: "/admin/tags-management" },
];

export default function AdminSidebar({ collapsed, toggleCollapse }) {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 64 : 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 64 : 240,
          boxSizing: "border-box",
          bgcolor: "#012341",
          color: "white",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        {!collapsed && <Typography variant="h6">Admin</Typography>}
        <IconButton onClick={toggleCollapse} color="inherit">
          <ChevronLeft sx={{ transform: collapsed ? "rotate(180deg)" : "none" }} />
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: "gray" }} />

      <List>
        {sidebarItems.map(({ label, icon, href }) => (
          <ListItemButton
            key={label}
            component={Link}
            to={href}
            selected={activePath === href}
            sx={{
              "&.Mui-selected": { bgcolor: "rgba(255, 255, 255, 0.2)" },
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={label} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
