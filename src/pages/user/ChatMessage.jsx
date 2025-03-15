import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatMessage = () => {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending message:", { message, recipients, senderId });
  };

  return (
    <Box p={4}>
      <Box  mx="auto">

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            {/* Sender ID Dropdown */}
            <Box mb={2}>
              <Typography variant="subtitle1" color="text.secondary" mb={1}>
                Sender ID
              </Typography>
              <Select
                fullWidth
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Select Sender ID</MenuItem>
                <MenuItem value="COMPANY">COMPANY</MenuItem>
                <MenuItem value="ALERT">ALERT</MenuItem>
                <MenuItem value="INFO">INFO</MenuItem>
              </Select>
            </Box>

            {/* Recipients Textarea */}
            <Box mb={2}>
              <Typography variant="subtitle1" color="text.secondary" mb={1}>
                Recipients (comma-separated or one per line)
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="Enter phone numbers..."
              />
            </Box>

            {/* Message Textarea */}
            <Box mb={2}>
              <Typography variant="subtitle1" color="text.secondary" mb={1}>
                Message
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
              />
              <Typography variant="body2" color="text.secondary" mt={1}>
                Characters: {message.length} | Messages:{" "}
                {Math.ceil(message.length / 160)}
              </Typography>
            </Box>

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" color="secondary">
                Save as Template
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
              >
                Send Message
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatMessage;
