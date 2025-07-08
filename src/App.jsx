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

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    <div style={{ display: 'flex' }}>
      <SidebarNav />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  </>
);

const App = () => (
  <Router>
    <Routes>
      {/* Home page does not include navbar or sidebar */}
      <Route path="/" element={<HomeScreen />} />

      {/* All dashboard-related screens wrapped in AppLayout */}
      <Route path="/dashboard" element={<AppLayout><DashboardScreen /></AppLayout>} />
      <Route path="/lessons" element={<AppLayout><LessonsScreen /></AppLayout>} />
      <Route path="/quiz" element={<AppLayout><QuizScreen /></AppLayout>} />
      <Route path="/capstone" element={<AppLayout><CapstoneScreen /></AppLayout>} />
      <Route path="/tutorials" element={<AppLayout><TutorialsScreen /></AppLayout>} />
      <Route path="/video" element={<AppLayout><VideoBuilderScreen /></AppLayout>} />
      <Route path="/videos" element={<AppLayout><VideoHistoryScreen /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsScreen /></AppLayout>} />
    </Routes>
  </Router>
);

export default App;
