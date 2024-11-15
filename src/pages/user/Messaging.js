import React, { useState } from 'react';
import { Box, TextField, Typography, Paper, Divider, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';

// Chat Display Component - Displays the list of messages
const ChatDisplay = ({ messages, alignRight }) => {
  return (
    <Paper
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '400px',
        overflowY: 'auto',
        bgcolor: 'background.default',
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: alignRight && msg.user === 'You' ? 'flex-end' : 'flex-start', // Align 'You' to the right in the messaging section
            mb: 1,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {msg.user}:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              bgcolor: msg.user === 'You' && alignRight ? 'primary.light' : 'grey.200', // Right-align and background for 'You'
              padding: 1,
              borderRadius: 1,
            }}
          >
            {msg.text}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

// Chat Input Component - TextField to input and send messages
const ChatInput = ({ message, setMessage, handleSendMessage }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        size="small"
      />
      <IconButton
        color="primary"
        onClick={handleSendMessage}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

const QuickGroupMessaging = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alice', text: 'Hey, how are you?' },
    { id: 2, user: 'Bob', text: 'I am good, thanks! How about you?' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, user: 'You', text: message }]);
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          bgcolor: 'background.default',
          overflow: 'auto',
          marginLeft: { xs: 0, sm: '240px' }, // Adjust for responsive sidebar
          paddingTop: '64px', // Ensure the content starts below the Navbar (64px is typical Navbar height)
        }}
      >
        {/* Navbar */}
        <UserNavbar /> <br/>

        {/* Messaging Area (Side by Side) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            height: 'calc(100vh - 164px)', // Leave space for navbar and margins
          }}
        >
          {/* Chat Display Component - Chat History (Displays only messages, aligned left) */}
          <Box
            sx={{
              flex: 1,
              bgcolor: 'background.paper',
              boxShadow: 3,
              borderRadius: 2,
              padding: 3,
              maxHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <GroupIcon color="primary" />
              <Typography variant="h6">Chat History</Typography>
            </Box>
            <Divider />
            {/* Chat Display Area (History only, align all messages to left) */}
            <ChatDisplay messages={messages} alignRight={false} />
          </Box>

          {/* Chat Input Component (Displays messages + input area) */}
          <Box
            sx={{
              flex: 1,
              bgcolor: 'background.paper',
              boxShadow: 3,
              borderRadius: 2,
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <GroupIcon color="primary" />
              <Typography variant="h6">Quick Group Messaging</Typography>
            </Box>
            <Divider />

            {/* Chat Display Area (Align 'You' messages to the right) */}
            <ChatDisplay messages={messages} alignRight={true} />

            {/* Chat Input Area */}
            <ChatInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickGroupMessaging;
