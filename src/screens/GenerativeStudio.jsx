import React from 'react';
import { Box, Typography } from '@mui/material';
import { GenerationForm } from '../components/generative/GenerationForm';
import { JobList } from '../components/generative/JobList';

const GenerativeStudio = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Generative Studio
      </Typography>
      {/* Using Box with Flexbox for a two-column responsive layout */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
          <GenerationForm />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
          <JobList />
        </Box>
      </Box>
    </Box>
  );
};

export default GenerativeStudio;