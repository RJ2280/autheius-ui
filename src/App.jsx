import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global layout components
import Navbar from './components/Navbar.jsx';
import SidebarNav from './components/SidebarNav.jsx';

// Screens
import HomeScreen from './screens/HomeScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import LessonsScreen from './screens/LessonsScreen.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import CapstoneScreen from './screens/CapstoneScreen.jsx';
import TutorialsScreen from './screens/TutorialsScreen.jsx';
import VideoBuilderScreen from './screens/VideoBuilderScreen.jsx';
import VideoHistoryScreen from './screens/VideoHistoryScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';

// Lesson viewer and dashboard
import LessonViewerWrapper from './components/LessonViewerWrapper.jsx';
import LessonCenter from './components/LessonCenter.jsx'; // 💡 Add this if using the new dashboard

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    <div style={{ display: 'flex' }}>
      <SidebarNav />
      <div style={{ flex: 1, padding: '1.5rem' }}>
        {children}
      </div>
    </div>
  </>
);

const App = () => (
  <Router>
    <Routes>
  <Route path='/admin' element={<AppLayout><AdminScreen /></AppLayout>} />
  <Route path='/history' element={<AppLayout><HistoryScreen /></AppLayout>} />
  <Route path='/achievements' element={<AppLayout><AchievementsScreen /></AppLayout>} />
      {/* Home page without global layout */}
      <Route path="/" element={<HomeScreen />} />

      {/* Core screens with layout */}
      <Route path="/dashboard" element={<AppLayout><DashboardScreen /></AppLayout>} />
      <Route path="/lessons" element={<AppLayout><LessonsScreen /></AppLayout>} />
      <Route path="/quiz" element={<AppLayout><QuizScreen /></AppLayout>} />
      <Route path="/capstone" element={<AppLayout><CapstoneScreen /></AppLayout>} />
      <Route path="/tutorials" element={<AppLayout><TutorialsScreen /></AppLayout>} />
      <Route path="/video" element={<AppLayout><VideoBuilderScreen /></AppLayout>} />
      <Route path="/videos" element={<AppLayout><VideoHistoryScreen /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsScreen /></AppLayout>} />

      {/* 🔥 New routes */}
      <Route path="/lesson/:id" element={<AppLayout><LessonViewerWrapper /></AppLayout>} />
      <Route path="/lesson-center" element={<AppLayout><LessonCenter /></AppLayout>} />
    </Routes>
  </Router>
);

export default App;
