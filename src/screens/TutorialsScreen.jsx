import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TutorialsScreen = () => (
  <Box>
    <Typography variant="h4" component="h1" gutterBottom>
      📖 Tutorial Hub
    </Typography>
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography>This is your tutorials center. Widgets and AI agents will go here.</Typography>
      {/* Future tutorial content can be added here */}
    </Paper>
  </Box>
);

export default TutorialsScreen;
