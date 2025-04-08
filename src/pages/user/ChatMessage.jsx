import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import {
  InsertDriveFile,
  DynamicFeed,
  AttachFile,
  Schedule,
  Contacts,
  ListAlt,
  GroupWork,
  History,
  ManageAccounts,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ComposeMessagePage = () => {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("CUSTOM");
  const [scheduleTime, setScheduleTime] = useState(dayjs());
  const [timezone, setTimezone] = useState("America/New_York");
  const [repeat, setRepeat] = useState("none");

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      {/* Alert Banner */}
      <Alert severity="warning" sx={{ mb: 3, maxWidth: "1100px", mx: "auto" }}>
        Notice: Scheduled messages may require approval. Please verify your sender ID before sending.
      </Alert>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: "1100px",
          mx: "auto",
          borderRadius: 3,
          backgroundColor: "#FAFBFF",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          border: "1px solid #E3EAF0",
          display: "flex",
          gap: 4,
        }}
      >
        {/* LEFT SIDE */}
        <Box flex={1}>
          <Typography fontWeight="bold" mb={1}>
            To
          </Typography>
          <TextField
            fullWidth
            placeholder="Start typing a number or contact name"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography fontWeight="bold" mb={1}>
            From
          </Typography>
          <Select
            fullWidth
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            sx={{ mb: 3 }}
          >
            <MenuItem value="DEFAULT">(456) 412-3452 (United States)</MenuItem>
            <MenuItem value="CUSTOM">Custom Sender ID</MenuItem>
          </Select>

          <Typography fontWeight="bold" mb={1}>
            Message
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
            Characters: {message.length} | Parts: {Math.ceil(message.length / 153)} | Cost: $
            {(Math.ceil(message.length / 153) * 0.01).toFixed(2)}
          </Typography>

          {/* Schedule */}
          <Typography fontWeight="bold" mb={1}>
            Schedule
          </Typography>
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
                <MenuItem key={i} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={scheduleTime.format("mm")}
              onChange={(e) => setScheduleTime(scheduleTime.minute(Number(e.target.value)))}
              sx={{ width: 80 }}
            >
              {[...Array(60)].map((_, i) => (
                <MenuItem key={i} value={i}>
                  {i.toString().padStart(2, "0")}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={scheduleTime.format("A")}
              onChange={(e) => {
                const isPM = e.target.value === "PM";
                const hour = scheduleTime.hour();
                const newHour = isPM ? (hour < 12 ? hour + 12 : hour) : hour === 12 ? 0 : hour;
                setScheduleTime(scheduleTime.hour(newHour));
              }}
              sx={{ width: 80 }}
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </Box>

          {/* Timezone and Repeat side-by-side */}
          <Box display="flex" gap={2} flexWrap="wrap" alignItems="flex-start">
            <Box flex={1}>
              <Typography fontWeight="bold" mb={1}>
                Timezone
              </Typography>
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
                This system automatically considers daylight saving time (DST) changes.
              </Typography>
            </Box>

            <Box flex={1}>
              <Typography fontWeight="bold" mb={1}>
                Repeat
              </Typography>
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

          {/* Footer Buttons */}
          <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Button variant="text" sx={{ textTransform: "uppercase" }}>
              Cancel
            </Button>
            <Box display="flex" gap={2}>
              <Button variant="outlined">Preview Message</Button>
              <Button variant="outlined">Preview in Calendar</Button>
              <Button
                variant="contained"
                startIcon={<Schedule />}
                sx={{
                  borderRadius: 2,
                  textTransform: "uppercase",
                  fontWeight: "600",
                  background: "linear-gradient(to right, #4A90E2, #00C49F)",
                  '&:hover': {
                    background: "linear-gradient(to right, #378FE6, #38C2A9)"
                  }
                }}
              >
                Schedule
              </Button>
            </Box>
          </Box>
        </Box>

        {/* RIGHT - Sidebar */}
        <Box sx={{ minWidth: 260 }}>
          <Paper elevation={0} sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: 3, border: '1px solid #E0E0E0' }}>
            <Typography variant="subtitle2" fontWeight="bold" mb={1}>
              Contacts
            </Typography>
            <List>
              <ListItem button><Contacts fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} /><ListItemText primary="Contacts" /></ListItem>
              <ListItem button><ListAlt fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} /><ListItemText primary="Lists" /></ListItem>
              <ListItem button><GroupWork fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} /><ListItemText primary="Segments" /></ListItem>
              <ListItem button><History fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} /><ListItemText primary="Frequently sent" /></ListItem>
            </List>

            <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
              Sender Settings
            </Typography>
            <List>
              <ListItem button><ManageAccounts fontSize="small" sx={{ mr: 1, color: "#00C49F" }} /><ListItemText primary="Customize sender info" /></ListItem>
            </List>

            <Typography variant="subtitle2" fontWeight="bold" mt={2} mb={1}>
              Actions
            </Typography>
            <List>
              <ListItem button><InsertDriveFile fontSize="small" sx={{ mr: 1, color: "#4A90E2" }} /><ListItemText primary="Insert template" /></ListItem>
              <ListItem button><DynamicFeed fontSize="small" sx={{ mr: 1, color: "#00C49F" }} /><ListItemText primary="Add dynamic field" /></ListItem>
              <ListItem button><AttachFile fontSize="small" sx={{ mr: 1, color: "#F57C00" }} /><ListItemText primary="Attach file" /></ListItem>
            </List>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default ComposeMessagePage;
