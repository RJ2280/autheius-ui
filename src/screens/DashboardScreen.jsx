import React from 'react';
import TaskBar from '../layout/TaskBar.jsx';

const DashboardScreen = () => (
  <div className="dashboard-screen">
    <TaskBar section="Dashboard" />
    <div className="content-wrapper">
      <h1>🧠 Welcome to Autheius</h1>
      <p>This is your dashboard center. Widgets and AI agents go here.</p>
    </div>
  </div>
);

export default DashboardScreen;
