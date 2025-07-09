import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import Navbar from './components/Navbar.jsx';
import SidebarNav from './components/SidebarNav.jsx';

// Screens
import DashboardScreen from './screens/DashboardScreen.jsx';
import LessonViewerWrapper from './components/LessonViewerWrapper.jsx';
import LessonCenter from './components/LessonCenter.jsx';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppLayout><DashboardScreen /></AppLayout>} />
      <Route path="/lesson/:id" element={<AppLayout><LessonViewerWrapper /></AppLayout>} />
      <Route path="/lesson-center" element={<AppLayout><LessonCenter /></AppLayout>} />
      <Route path="*" element={<AppLayout><Navigate to="/" replace /></AppLayout>} />
    </Routes>
  </Router>
);

export default App;
