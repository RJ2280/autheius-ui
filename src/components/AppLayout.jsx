import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../layout/Sidebar';

const AppLayout = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      // A dark background color that complements the sidebar
      backgroundColor: '#020b1a'
    }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        {/* The content for each page will be rendered here */}
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
