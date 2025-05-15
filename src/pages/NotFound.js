import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  keyframes
} from '@mui/material';
import { Home, SentimentVeryDissatisfied } from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  // CSS keyframes for animations
  const floatAnimation = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `;

  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'rotate 20s linear infinite',
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            borderRadius: 4,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: `${pulseAnimation} 2s ease-in-out infinite`,
          }}
        >
          <Box
            sx={{
              animation: `${floatAnimation} 3s ease-in-out infinite`,
              mb: 3,
            }}
          >
            <SentimentVeryDissatisfied
              sx={{
                fontSize: 120,
                color: '#60a5fa',
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(90deg, #60a5fa 0%, #93c5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </Typography>

          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
            Oops! Page Not Found
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={handleRedirect}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 50,
              background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Return to Homepage
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;