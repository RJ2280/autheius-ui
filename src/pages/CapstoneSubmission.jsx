import React from 'react';
import { Box, Typography } from '@mui/material';
import CapstoneUploader from '../components/CapstoneUploader';

const CapstoneSubmission = () => {
  const userId = 'robbie'; // Placeholder

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
        Capstone Project Submission
      </Typography>
      <CapstoneUploader userId={userId} />
    </Box>
  );
};

export default CapstoneSubmission;