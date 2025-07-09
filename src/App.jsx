import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';

// Screens
import DashboardScreen from './screens/DashboardScreen.jsx';
import LessonViewerWrapper from './components/LessonViewerWrapper.jsx';
import LessonCenter from './components/LessonCenter.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import CapstoneScreen from './screens/CapstoneScreen.jsx';
import TutorialsScreen from './screens/TutorialsScreen.jsx';
import VideoBuilderScreen from './screens/VideoBuilderScreen.jsx';
import VideoHistoryScreen from './screens/VideoHistoryScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppLayout><DashboardScreen /></AppLayout>} />
      <Route path="/lesson-center" element={<AppLayout><LessonCenter /></AppLayout>} />
      <Route path="/lesson/:id" element={<AppLayout><LessonViewerWrapper /></AppLayout>} />
      <Route path="/quiz" element={<AppLayout><QuizScreen /></AppLayout>} />
      <Route path="/capstone" element={<AppLayout><CapstoneScreen /></AppLayout>} />
      <Route path="/tutorials" element={<AppLayout><TutorialsScreen /></AppLayout>} />
      <Route path="/video-builder" element={<AppLayout><VideoBuilderScreen /></AppLayout>} />
      <Route path="/video-history" element={<AppLayout><VideoHistoryScreen /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsScreen /></AppLayout>} />
      <Route path="*" element={<AppLayout><Navigate to="/" replace /></AppLayout>} />
    </Routes>
  </Router>
);

export default App;
