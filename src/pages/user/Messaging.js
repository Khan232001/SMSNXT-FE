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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, height: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ display: { xs: 'none', sm: 'block' }, width: { sm: '240px' }, position: 'fixed', top: 0, left: 0, height: '100vh' }}>
        <UserSidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: { xs: 2, sm: 3 },
          bgcolor: 'background.default',
          overflow: 'auto',
          marginLeft: { xs: 0, sm: '240px' }, // Remove excessive space between sidebar and content
          paddingTop: { xs: '56px', sm: '64px' }, // Navbar height adjustment
        }}
      >
        {/* Navbar */}
        <UserNavbar />

        {/* Messaging Area */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            height: 'calc(100vh - 164px)', // Adjust height based on navbar
          }}
        >
          {/* Chat History */}
          <Box
            sx={{
              flex: 1,
              bgcolor: 'background.paper',
              boxShadow: 3,
              borderRadius: 2,
              padding: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              maxHeight: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <GroupIcon color="primary" />
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Chat History
              </Typography>
            </Box>
            <Divider />
            <ChatDisplay messages={messages} alignRight={false} />
          </Box>

          {/* Chat Input and Display */}
          <Box
            sx={{
              flex: 1,
              bgcolor: 'background.paper',
              boxShadow: 3,
              borderRadius: 2,
              padding: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              maxHeight: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <GroupIcon color="primary" />
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Quick Group Messaging
              </Typography>
            </Box>
            <Divider />
            <ChatDisplay messages={messages} alignRight={true} />
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
