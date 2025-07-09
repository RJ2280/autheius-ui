import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { useUserStore } from '../state/userStore';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Typography sx={{ color: 'white' }}>Please log in to view your profile.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
        User Profile
      </Typography>
      <Paper sx={{ p: 3, backgroundColor: 'background.paper', color: 'text.primary' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', color: 'background.default' }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">{user.email}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;