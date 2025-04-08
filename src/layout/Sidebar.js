import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Joyride from "react-joyride";
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

const sidebarItems = [
  { label: "Getting Started", icon: <RocketLaunch />, href: "/getting-started" },
  { label: "Dashboard", icon: <Dashboard />, href: "/dashboard" },
  { label: "Compose", icon: <Mail />, href: "/compose" },
  { label: "Messages", icon: <Message />, href: "/messaging" },
  { label: "Campaign", icon: <Campaign />, href: "/campaign" },
  { label: "Subscriptions", icon: <People />, href: "/subscription-plans" },
  { label: "Contacts", icon: <People />, href: "/contact-management" },
  { label: "Templates", icon: <Folder />, href: "/templates" },
  { label: "Reports", icon: <PieChart />, href: "/reporting" },
  { label: "Admin", icon: <Settings />, href: "/admin/dashboard" },
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

export default function Sidebar({ collapsed, toggleCollapse, hiddenRoutes = ["/login", "/sign", "/forgot-password"] }) {
  const location = useLocation();
  const activePath = location.pathname;

  const [runTour, setRunTour] = useState(true); // You can set this based on localStorage or a button toggle

  if (!Array.isArray(hiddenRoutes)) {
    console.error("hiddenRoutes should be an array");
    return null;
  }

  if (hiddenRoutes.includes(activePath)) return null;

  const activeTab = tabItemsMap.find((tab) => activePath.includes(tab.path));
  const activeTabItems = activeTab ? activeTab.items : null;
  const steps = [
    {
      target: ".sidebar-step-getting-started",
      content: "🚀 Welcome aboard! This is your launchpad to master smsNxt. Let's take a quick spin!",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: ".sidebar-step-dashboard",
      content: "📊 This is your mission control – keep an eye on all vital stats from here.",
      placement: "right",
    },
    {
      target: ".sidebar-step-compose",
      content: "✉️ Time to send some magic. Use this to write and personalize your messages.",
      placement: "right",
    },
    {
      target: ".sidebar-step-messages",
      content: "💬 Your inbox lives here. Open, assign, and manage chats in real-time.",
      placement: "right",
    },
    {
      target: ".sidebar-step-campaign",
      content: "📢 Plan, schedule, and analyze campaigns – all from this dashboard.",
      placement: "right",
    },
    {
      target: ".sidebar-step-subscriptions",
      content: "👥 Manage who gets what. Create and tweak subscription plans right here.",
      placement: "right",
    },
    {
      target: ".sidebar-step-contacts",
      content: "📇 Keep your contacts organized. Add, import, or update user data here.",
      placement: "right",
    },
    {
      target: ".sidebar-step-templates",
      content: "📁 Templates save time. Reuse content that works again and again.",
      placement: "right",
    },
    {
      target: ".sidebar-step-reports",
      content: "📈 Track performance with analytics. Know what’s working and what needs a boost.",
      placement: "right",
    },
    {
      target: ".sidebar-step-admin",
      content: "⚙️ Admin HQ! Roles, settings, and advanced controls live here.",
      placement: "right",
    },
  ];
  

  return (
    <>
      <Joyride
  steps={steps}
  run={runTour}
  showSkipButton
  showProgress
  continuous
  styles={{
    options: {
      zIndex: 1300,
      arrowColor: "#ffffff",
      backgroundColor: "#ffffff",
      overlayColor: "rgba(0, 0, 0, 0.5)",
      primaryColor: "#ff6d00", // vibrant orange accent
      textColor: "#333",
      width: 320,
      borderRadius: 12,
    },
    tooltipContainer: {
      textAlign: "left",
      padding: "16px",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
    buttonNext: {
      backgroundColor: "#ff6d00",
      borderRadius: "6px",
    },
    buttonBack: {
      color: "#888",
      marginRight: 10,
    },
    tooltip: {
      transform: "translateX(10px)", // shifts tooltip a bit to the right
    },
  }}
  locale={{
    back: "Previous",
    close: "Close",
    last: "Finish",
    next: "Next →",
    skip: "Skip Tour",
  }}
  callback={(data) => {
    if (["finished", "skipped"].includes(data.status)) {
      setRunTour(false);
    }
  }}
/>

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

        <List>
          {sidebarItems.map(({ label, icon, href }) => {
            const className = `sidebar-step-${label.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <ListItemButton
                key={label}
                component={Link}
                to={href}
                selected={activePath === href}
                className={className}
                sx={{
                  "&.Mui-selected": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={label} />}
              </ListItemButton>
            );
          })}
        </List>

        <Divider sx={{ bgcolor: "gray" }} />

        {!collapsed && activeTabItems && (
          <Box p={2} style={{ backgroundColor: activeTab.bgColor }}>
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
    </>
  );
}
