import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { GenerationForm } from '../components/generative/GenerationForm';
import { JobList } from '../components/generative/JobList';

const GenerativeStudio = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="h1">Generative Studio</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}><GenerationForm /></Grid>
        <Grid item xs={12} md={8}><JobList /></Grid>
      </Grid>
    </Box>
  );
};

export default GenerativeStudio;
