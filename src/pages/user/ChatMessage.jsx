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

  console.log(message)
  const handleSubmit = (e) => {
    e.preventDefault();
   setMessage(e.target.value)
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
          {/* Recipients Section */}
          <Box mb={3}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
            >
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

          {/* Sender Section */}
          <Box mb={3}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
            >
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
              <MenuItem value="DEFAULT">
                Default sender settings (recommended)
              </MenuItem>
              <MenuItem value="CUSTOM">Custom Sender ID</MenuItem>
            </Select>
          </Box>

          {/* Message Section */}
          <Box mb={3}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
            >
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

            {/* Message Controls */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <List
                  dense
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <ListItem>
                    <ListItemText primary="Contacts" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="Segments" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Frequently sent" />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={6}>
                <List
                  dense
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <ListItem>
                    <ListItemText primary="Sensor settings" />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="Insert template" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Add dynamic field" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Attach file" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>

            {/* Message Footer */}
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Characters: {message.length}/918 | Parts:{" "}
              {Math.ceil(message.length / 153)}/6 | Cost: $
              {(Math.ceil(message.length / 153) * 0.01).toFixed(2)}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Schedule />}
              sx={{ textTransform: "none", color: "text.primary" }}
            >
              Schedule message
            </Button>

            <Box>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Send />}
                sx={{ textTransform: "none", ml: 1 }}
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
