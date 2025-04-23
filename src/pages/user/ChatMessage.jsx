import React, { useState } from "react";
import {
  Box, Button, MenuItem, Select, TextField, Typography, Paper, List,
  ListItem, ListItemText, Alert, InputAdornment, IconButton, Divider, Avatar
} from "@mui/material";
import {
  Contacts, DynamicFeed, AttachFile, Schedule, Send
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { InsertEmoticon, Mic } from "@mui/icons-material";

const ComposeMessagePage = () => {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("CUSTOM");
  const [scheduleTime, setScheduleTime] = useState(dayjs());
  const [timezone, setTimezone] = useState("America/New_York");
  const [repeat, setRepeat] = useState("none");
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ px: 3, mt: 2, maxWidth: 1450, mx: "auto" }}>
        <Alert
          severity="warning"
          sx={{
            maxWidth: "850px",
            width: "100%",
            px: 2,
            py: 0.2,
            fontSize: "14px",
            
          }}
        >
          Notice: Scheduled messages may require approval. Please verify your sender ID before sending.
        </Alert>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", px: 3, mt: 3 }}>
        <Box sx={{ display: "flex", gap: 3, maxWidth: 1450, alignItems: "flex-start" }}>

          <Box sx={{ flex: 1, minWidth: "500px" }}>
            <Typography fontWeight="bold" mb={1}>To</Typography>
            <TextField
              fullWidth
              placeholder="Start typing a number or contact name"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Contacts />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography fontWeight="bold" mb={1}>From</Typography>
            <Select
              fullWidth
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              sx={{ mb: 3 }}
            >
              <MenuItem value="DEFAULT">(456) 412-3452 (United States)</MenuItem>
              <MenuItem value="CUSTOM">Custom Sender ID</MenuItem>
            </Select>

            <Typography fontWeight="bold" mb={1}>Message</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Type your message with <FIRST_NAME> or <COMPANY_NAME>..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
              Characters: {message.length} | Parts: {Math.ceil(message.length / 153)} | Cost: ${(
                Math.ceil(message.length / 153) * 0.01
              ).toFixed(2)}
            </Typography>

            <Typography fontWeight="bold" mb={1}>Schedule</Typography>
            <Box display="flex" gap={2} alignItems="center" mb={2} flexWrap="wrap">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="First send date"
                  value={scheduleTime}
                  onChange={(newValue) => setScheduleTime(newValue)}
                  sx={{ width: 160 }}
                />
              </LocalizationProvider>

              <Select
                value={scheduleTime.format("hh")}
                onChange={(e) => setScheduleTime(scheduleTime.hour(Number(e.target.value)))}
                sx={{ width: 80 }}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>

              <Select
                value={scheduleTime.format("mm")}
                onChange={(e) => setScheduleTime(scheduleTime.minute(Number(e.target.value)))}
                sx={{ width: 80 }}
              >
                {[...Array(60)].map((_, i) => (
                  <MenuItem key={i} value={i}>{i.toString().padStart(2, "0")}</MenuItem>
                ))}
              </Select>

              <Select
                value={scheduleTime.format("A")}
                onChange={(e) => {
                  const isPM = e.target.value === "PM";
                  const hour = scheduleTime.hour();
                  const newHour = isPM ? (hour < 12 ? hour + 12 : hour) : (hour === 12 ? 0 : hour);
                  setScheduleTime(scheduleTime.hour(newHour));
                }}
                sx={{ width: 80 }}
              >
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
              </Select>
            </Box>

            <Box display="flex" gap={2} flexWrap="wrap" alignItems="flex-start">
              <Box flex={1}>
                <Typography fontWeight="bold" mb={1}>Timezone</Typography>
                <Select
                  fullWidth
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <MenuItem value="America/New_York">(UTC-0500) America/New_York</MenuItem>
                  <MenuItem value="America/Chicago">(UTC-0600) America/Chicago</MenuItem>
                  <MenuItem value="America/Los_Angeles">(UTC-0800) America/Los_Angeles</MenuItem>
                </Select>
                <Typography variant="caption" color="text.secondary">
                  Automatically accounts for daylight saving time.
                </Typography>
              </Box>

              <Box flex={1}>
                <Typography fontWeight="bold" mb={1}>Repeat</Typography>
                <Select
                  fullWidth
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                >
                  <MenuItem value="none">Doesn't repeat</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
              <Button variant="text" sx={{ textTransform: "uppercase" }}>Cancel</Button>
              <Box display="flex" gap={2}>
                <Button variant="outlined" onClick={() => setPreviewMode(!previewMode)}>
                  {previewMode ? "Hide Preview" : "Preview Message"}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Schedule />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "uppercase",
                    fontWeight: "600",
                    background: "linear-gradient(to right, #4A90E2, #00C49F)",
                    "&:hover": {
                      background: "linear-gradient(to right, #378FE6, #38C2A9)",
                    },
                  }}
                >
                  Schedule
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ minWidth: 260, maxWidth: 300 }}>
          <Paper elevation={0} sx={{ p: 4, backgroundColor: "#ffffff", borderRadius: 3, border: "1px solid #E0E0E0" }}>
  {/* Quick Actions */}
  <Typography variant="subtitle2" fontWeight="bold" mb={1}>Quick Actions</Typography>
  <List>
    <ListItem button>
      <Contacts fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} />
      <ListItemText primary="Add Contacts" />
    </ListItem>
    <ListItem button>
      <DynamicFeed fontSize="small" sx={{ mr: 1, color: "#00C49F" }} />
      <ListItemText primary="Insert Template" />
    </ListItem>
    <ListItem button>
      <AttachFile fontSize="small" sx={{ mr: 1, color: "#F57C00" }} />
      <ListItemText primary="Add Media" />
    </ListItem>
  </List>

  <Divider sx={{ my: 2 }} />

  {/* Message Options */}
  <Typography variant="subtitle2" fontWeight="bold" mb={1}>Message Options</Typography>
  <List>
    <ListItem button>
      <Send fontSize="small" sx={{ mr: 1, color: "#4CAF50" }} />
      <ListItemText primary="Send Immediately" />
    </ListItem>
    <ListItem button>
      <Schedule fontSize="small" sx={{ mr: 1, color: "#2196F3" }} />
      <ListItemText primary="Schedule for Later" />
    </ListItem>
  </List>

  {/*  Analytics Section — ADD THIS INSIDE THE PAPER */}
  <Divider sx={{ my: 2 }} />
  <Typography variant="subtitle2" fontWeight="bold" mb={1}>Analytics</Typography>
  <Box
    sx={{
      p: 2,
      backgroundColor: "#f5f5f5",
      borderRadius: 2,
      border: "1px solid #ddd",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="caption" color="text.secondary">
      Estimated Delivery
    </Typography>
    <Typography fontWeight="bold" mb={1}>Instant</Typography>
    <Typography variant="caption" color="text.secondary">
      Message Cost
    </Typography>
    <Typography fontWeight="bold">
      ${(Math.ceil(message.length / 153) * 0.01).toFixed(2)}
    </Typography>
  </Box>
</Paper>
          </Box>
          

          {previewMode && (
  <Box
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >
    <Box
      sx={{
        width: 300,
        height: 550,
        border: "10px solid #222",
        borderRadius: "30px",
        backgroundColor: "#f8f8f8",
        overflow: "hidden",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        mt: 0.5,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Status Bar */}
      <Box
        sx={{
          height: 30,
          backgroundColor: "#222",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          fontSize: 12,
        }}
      >
        <span>9:41</span>
        <Box sx={{ display: "flex", gap: 1 }}>
          <span>5G</span>
          <span>100%</span>
        </Box>
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #eee",
        }}
      >
        <Avatar sx={{ bgcolor: "#4A90E2", mr: 1 }}>S</Avatar>
        <Box>
          <Typography fontWeight="bold">SMS Service</Typography>
          <Typography variant="caption" color="text.secondary">
            +1 (456) 412-3452
          </Typography>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          backgroundColor: "#e5ddd5",
        }}
      >
        {message ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <Box
                sx={{
                  backgroundColor: "#DCF8C6",
                  borderRadius: "18px 18px 0 18px",
                  p: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography>{message}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "18px 18px 18px 0",
                  p: 2,
                  maxWidth: "70%",
                }}
              >
                <Typography>Hi! This is a reply to your message.</Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <Typography>No message to preview</Typography>
          </Box>
        )}
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#f0f0f0",
          px: 1,
          py: 0.8,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <TextField
          placeholder="Type a message"
          size="small"
          fullWidth
          sx={{
            mx: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "white",
            },
          }}
        />
        <IconButton>
          <Mic />
        </IconButton>
      </Box>

      {/* Footer */}
      {message && (
        <Box
          sx={{
            textAlign: "center",
            py: 0.5,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Reply STOP to unsubscribe
          </Typography>
        </Box>
      )}
    </Box>
  </Box>
  
)}
        </Box>
      </Box>
    </Box>
  );
};

export default ComposeMessagePage;
