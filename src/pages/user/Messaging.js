import React from 'react';
import { Box } from '@mui/material';
import UserNavbar from '../../components/UserNavbar';
import UserSidebar from '../../components/UserSidebar';
import ChatMessage from './ChatMessage';

const QuickGroupMessaging = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: { sm: '240px' },
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
        }}
      >
        <UserSidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          marginLeft: { xs: 0, sm: '240px' },
          paddingTop: { xs: '76px', sm: '64px' },
          paddingLeft: '24px',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          margin: '16px',
        }}
      >
        <UserNavbar />
        <ChatMessage />
      </Box>
    </Box>
  );
};

export default QuickGroupMessaging;
