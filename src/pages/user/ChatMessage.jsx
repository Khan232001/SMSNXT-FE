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
  Divider,
  IconButton,
} from "@mui/material";
import { Send, Delete, Add } from "@mui/icons-material";

const ConversationList = ({ conversations, onDelete }) => {
  return (
    <Box className="w-full md:w-1/4 p-4 border-r border-gray-300 overflow-y-auto max-h-screen">
      <Typography variant="h5" className="mb-4 text-gray-800">
        Conversations
      </Typography>
      <List>
        {conversations.map((conv, index) => (
          <React.Fragment key={index}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(index)}
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText primary={conv} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

const ChatMessage = () => {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderId, setSenderId] = useState("");
  const [conversations, setConversations] = useState([
    "Hello! How are you?",
    "Hey, what's up?",
    "Let's meet tomorrow.",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConversations([...conversations, message]);
    setMessage("");
  };

  const handleDeleteConversation = (index) => {
    setConversations(conversations.filter((_, i) => i !== index));
  };

  return (
    <Box className="flex flex-col md:flex-row max-w-7xl mx-auto mt-8 bg-white p-4 rounded-md shadow-md w-full">
      <ConversationList
        conversations={conversations}
        onDelete={handleDeleteConversation}
      />
      <Box className="flex-[3] p-4">
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
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
            <Box display="flex" justifyContent="space-between" gap={2}>
              <Button variant="outlined" color="secondary" startIcon={<Add />}>
                Save as Template
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Send />}
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
