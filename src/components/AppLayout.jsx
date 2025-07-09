import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../layout/Sidebar';
import Topbar from '../layout/Topbar';

const AppLayout = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      // The background color is now handled by the theme via CssBaseline
    }}>
      <Sidebar />
      <Box component="main" sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <Topbar />
        <Box sx={{
          flexGrow: 1,
          p: 3,
          overflowY: 'auto'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
