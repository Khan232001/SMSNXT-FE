import React from "react";
import { Box, Paper } from "@mui/material";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import ChatMessage from "./ChatMessage";

const QuickGroupMessaging = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F8F9FB" }}>

      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: { sm: "240px" },
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          bgcolor: "#263238", // Dark sidebar
          color: "#FFF",
        }}
      >
        <Sidebar />
      </Box>

   
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: 0, sm: "240px" },
          padding: "16px",
          paddingTop: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <ChatMessage />
        </Paper>
      </Box>
    </Box>
  );
};

export default QuickGroupMessaging;
