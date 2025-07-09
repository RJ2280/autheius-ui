import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { ColorModeContext, useMode } from './theme'; // Assuming you have a theme.js file

import AppLayout from './components/AppLayout.jsx';

// Screens & Pages
import DashboardScreen from './screens/DashboardScreen.jsx';
import LessonCenter from './components/LessonCenter.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import TutorialsScreen from './screens/TutorialsScreen.jsx';
import VideoBuilderScreen from './screens/VideoBuilderScreen.jsx';
import VideoHistoryScreen from './screens/VideoHistoryScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';

// New pages from your snippet
import GenerativeStudio from './pages/GenerativeStudio.jsx';
// Assuming the following pages exist in `src/pages`
import LessonPage from './pages/LessonPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CapstoneSubmission from './pages/CapstoneSubmission.jsx';

const App = () => (
  // To enable MUI theming from your snippet, you would wrap <Router> with ThemeProvider.
  // This requires a `src/theme.js` file that exports `useMode` and `ColorModeContext`.
  //
  // const AppWithTheme = () => {
  //   const [theme, colorMode] = useMode();
  //   return (
  //     <ColorModeContext.Provider value={colorMode}>
  //       <ThemeProvider theme={theme}>
  //         <CssBaseline />
  //         <App />
  //       </ThemeProvider>
  //     </ColorModeContext.Provider>
  //   );
  // }
  <Router>
    <Routes>
      <Route path="/" element={<AppLayout><DashboardScreen /></AppLayout>} />
      <Route path="/lesson-center" element={<AppLayout><LessonCenter /></AppLayout>} />
      <Route path="/lesson/:lessonId" element={<AppLayout><LessonPage /></AppLayout>} />
      <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
      <Route path="/capstone" element={<AppLayout><CapstoneSubmission /></AppLayout>} />
      <Route path="/studio" element={<AppLayout><GenerativeStudio /></AppLayout>} />
      <Route path="/quiz" element={<AppLayout><QuizScreen /></AppLayout>} />
      <Route path="/tutorials" element={<AppLayout><TutorialsScreen /></AppLayout>} />
      <Route path="/video-builder" element={<AppLayout><VideoBuilderScreen /></AppLayout>} />
      <Route path="/video-history" element={<AppLayout><VideoHistoryScreen /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsScreen /></AppLayout>} />
      <Route path="*" element={<AppLayout><Navigate to="/" replace /></AppLayout>} />
    </Routes>
  </Router>
);

export default App;
