import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Send,
  Schedule,
  InsertDriveFile,
  DynamicFeed,
  FormatListBulleted,
} from "@mui/icons-material";

const TextMessageForm = () => {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("");
  const [scheduleTime, setScheduleTime] = useState(dayjs());
  
  console.log(message)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      recipients,
      senderId,
      message,
      scheduleTime: scheduleTime.format("YYYY-MM-DD HH:mm:ss"),
    };
  
    console.log("Submitting payload:", payload);
  
    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await res.json();
      console.log("Response from backend:", result);
      alert("Message sent successfully!");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
      >
        Compose a text message
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
      <form onSubmit={handleSubmit}>
  <Grid container spacing={2}>
    {/* LEFT SIDE: Form Fields */}
    <Grid item xs={12} md={8}>
      {/* To Field */}
      <Box mb={3}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          To
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Start typing a number or contact name"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FormatListBulleted color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* From Field */}
      <Box mb={3}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          From
        </Typography>
        <Select
          fullWidth
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
          displayEmpty
          renderValue={(selected) =>
            selected || "Default sender settings (recommended)"
          }
        >
          <MenuItem value="DEFAULT">Default sender settings (recommended)</MenuItem>
          <MenuItem value="CUSTOM">Custom Sender ID</MenuItem>
        </Select>
      </Box>

      {/* Message Field */}
      <Box mb={3}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          Message
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          sx={{ mb: 1 }}
        />
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Characters: {message.length}/918 | Parts: {Math.ceil(message.length / 153)}/6 | Cost: ${(
            Math.ceil(message.length / 153) * 0.01
          ).toFixed(2)}
        </Typography>
      </Box>

      {/* Schedule Picker */}
      <Box mb={3}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          Schedule
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Select date & time"
            value={scheduleTime}
            onChange={(newValue) => setScheduleTime(newValue)}
            sx={{ width: "100%" }}
          />
        </LocalizationProvider>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="outlined" startIcon={<Schedule />} sx={{ textTransform: "none", color: "text.primary" }}>
          Schedule message
        </Button>
        <Button type="submit" variant="contained" startIcon={<Send />} sx={{ textTransform: "none" }}>
          Send now
        </Button>
      </Box>
    </Grid>

    {/* RIGHT SIDE: Message Controls */}
    <Grid item xs={12} md={4}>
      <List dense sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, mb: 2 }}>
        <ListItem><ListItemText primary="Contacts" /></ListItem>
        <Divider />
        <ListItem button><ListItemText primary="Segments" /></ListItem>
        <ListItem button><ListItemText primary="Frequently sent" /></ListItem>
      </List>

      <List dense sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
        <ListItem><ListItemText primary="Sensor settings" /></ListItem>
        <Divider />
        <ListItem button><ListItemText primary="Insert template" /></ListItem>
        <ListItem button><ListItemText primary="Add dynamic field" /></ListItem>
        <ListItem button><ListItemText primary="Attach file" /></ListItem>
      </List>
    </Grid>
  </Grid>
</form>
      </Paper>
    </Box>
  );
};

export default TextMessageForm;
