import React from 'react';
import { Box, Typography } from '@mui/material';
import CapstoneUploader from '../components/CapstoneUploader';
import { useUserStore } from '../state/userStore';

const CapstoneSubmission = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Typography sx={{ color: 'white' }}>Please log in to submit your capstone project.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
        Capstone Project Submission
      </Typography>
      <CapstoneUploader userId={user.id} />
    </Box>
  );
};

export default CapstoneSubmission;