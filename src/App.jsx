import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, useMode } from './theme.js';

import AppLayout from './components/AppLayout.jsx';

// --- Pages & Screens ---
// It's good practice to organize these into a single 'pages' or 'screens' directory.
// For now, we'll import from their current locations.
import DashboardScreen from './screens/DashboardScreen.jsx'; // Using the newer, MUI-based lessons screen
import TutorialsScreen from './screens/TutorialsScreen.jsx';
import VideoBuilderScreen from './screens/VideoBuilderScreen.jsx';
import VideoHistoryScreen from './screens/VideoHistoryScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import GenerativeStudio from './screens/GenerativeStudio.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CapstoneSubmission from './pages/CapstoneSubmission.jsx';

/**
 * Defines all the application routes.
 * This component is kept separate to keep the main App component clean and focused on its own task.
 */
const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppLayout><DashboardScreen /></AppLayout>} />
      <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
      <Route path="/capstone" element={<AppLayout><CapstoneSubmission /></AppLayout>} />
      <Route path="/studio" element={<AppLayout><GenerativeStudio /></AppLayout>} />
      <Route path="/tutorials" element={<AppLayout><TutorialsScreen /></AppLayout>} />
      <Route path="/video-builder" element={<AppLayout><VideoBuilderScreen /></AppLayout>} />
      <Route path="/video-history" element={<AppLayout><VideoHistoryScreen /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsScreen /></AppLayout>} />
      {/* Fallback route to redirect unknown paths to the dashboard */}
      <Route path="*" element={<AppLayout><Navigate to="/" replace /></AppLayout>} />
    </Routes>
  </Router>
);

/**
 * The main application component.
 * It sets up the Material-UI theme and context providers, which are then available to all child components.
 */
const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
