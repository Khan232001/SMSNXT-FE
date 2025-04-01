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
  RocketLaunch, // Added RocketLaunch icon
} from "@mui/icons-material";
import { useState } from "react";

const sidebarItems = [
  { label: "Getting Started", icon: <RocketLaunch />, href: "/getting-started" }, // Updated with RocketLaunch icon
  { label: "Dashboard", icon: <Dashboard />, href: "/dashboard" },
  { label: "Compose", icon: <Mail />, href: "/compose" },
  { label: "Two way Messaging", icon: <Message />, href: "/messaging" },
  { label: "Campaign", icon: <Campaign />, href: "/campaign" },
  { label: "Subscriptions", icon: <People />, href: "/subscription-plans" },
  { label: "Contacts", icon: <People />, href: "/contact-management" },
  { label: "Templates", icon: <Folder />, href: "/templates" },
  { label: "Reports", icon: <PieChart />, href: "/reporting" },
  { label: 'Tags', icon: <Settings />, href: '/tags-management' },
  // { label: "Admin", icon: <Settings />, href: "/admin/dashboard" },
];

const tabItemsMap = [
  {
    path: "/campaign",
    items: [
      { label: "Upcoming", icon: <Dashboard />, count: 1 },
      { label: "Paused", icon: <PauseCircleOutline />, count: 0 },
      { label: "Not Sent", icon: <HighlightOff />, count: 0 },
      { label: "Completed", icon: <Archive />, count: 1 },
      { label: "Calendar", icon: <CalendarMonth /> },
    ],
    bgColor: "hsl(11deg 69.89% 59.73%)"
  },
  {
    path: "/messaging",
    items: [
      { label: "Open", icon: <ChatBubbleOutline />, count: 1 },
      { label: "Unread", icon: <VisibilityOff />, count: 0 },
      { label: "Assigned to me", icon: <AssignmentTurnedIn />, count: 0 },
      { label: "Unassigned", icon: <FolderOpen />, count: 1 },
      { label: "Solved", icon: <CheckCircleOutline />, count: 0 },
      { label: "All chats", icon: <Folder />, count: 1 },
    ],
    bgColor: "hsl(206deg 66.55% 44.44%)"
  },
];

export default function Sidebar({ collapsed, toggleCollapse, hiddenRoutes = []}) {


  const location = useLocation();
  const activePath = location.pathname;
  
  // Ensure hiddenRoutes is always an array
  if (!Array.isArray(hiddenRoutes)) {
    console.error("hiddenRoutes should be an array");
    return null;
  }

  // Hide sidebar on specified routes
  if (hiddenRoutes.includes(activePath)) return null;

  // Find active tab items for the current path
  const activeTab = tabItemsMap.find((tab) => activePath.includes(tab.path));
  const activeTabItems = activeTab ? activeTab.items : null;
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 64 : 240,
        overflow: "hidden",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 64 : 240,
          boxSizing: "border-box",
          bgcolor: "#012341",
          overflow: "hidden",
          color: "white",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        {!collapsed && <Typography variant="h6">smsNxt</Typography>}
        <IconButton
          onClick={toggleCollapse}
          color="inherit"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft sx={{ transform: collapsed ? "rotate(180deg)" : "none" }} />
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: "gray" }} />

      {/* Sidebar Main Items */}
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

      <Divider sx={{ bgcolor: "gray" }} />

      {/* Active Tab Items (Dynamic based on route) */}
      {!collapsed && activeTabItems && (
        <Box p={2} style={{
          backgroundColor: activeTab.bgColor
        }}>
          <Typography variant="caption" color="white">
            {activeTab.path === "/campaign" ? "CAMPAIGN" : "MESSAGES"}
          </Typography>
          <List>
            {activeTabItems.map(({ label, icon, count }) => (
              <ListItemButton key={label} sx={{ "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" } }}>
                <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
                {count !== undefined && count > 0 && (
                  <Typography variant="body2" sx={{ color: "white", ml: 1 }}>
                    {count}
                  </Typography>
                )}
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Drawer>
  );
}
