import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { Send, Schedule } from "@mui/icons-material";

const TextMessageForm = () => {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message Sent: ${message}`);
    setMessage("");
  };

  return (
    <Box className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border">
      <Typography variant="h6" className="mb-4 font-semibold text-gray-800">
        Compose a text message
      </Typography>
      <Paper elevation={2} className="p-4 rounded-md">
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography variant="subtitle1" className="text-gray-700">
              To
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="Start typing a number or contact name"
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" className="text-gray-700">
              From
            </Typography>
            <Select
              fullWidth
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                Default sender settings (recommended)
              </MenuItem>
              <MenuItem value="CUSTOM">Custom Sender</MenuItem>
            </Select>
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" className="text-gray-700">
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <Typography variant="body2" className="text-gray-500 mt-1">
              Characters: {message.length} | Parts:{" "}
              {Math.ceil(message.length / 160)} | Cost: $
              {Math.ceil(message.length / 160) * 0.01}
            </Typography>
          </Box>

          <Box className="flex justify-between mt-4">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Schedule />}
              className="border-gray-400 text-gray-700"
            >
              Schedule message
            </Button>
            <Box>
              <Button variant="outlined" className="mr-2">
                Preview
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Send />}
              >
                Send now
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default TextMessageForm;
