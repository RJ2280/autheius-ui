import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';

const ProfilePage = () => {
  const userId = 'robbie'; // Placeholder

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
        User Profile
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: '#00ffff' }}>{userId.charAt(0).toUpperCase()}</Avatar>
          <Box>
            <Typography variant="h5">{userId}</Typography>
            <Typography variant="body1" color="text.secondary">Autheius AI Student</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;