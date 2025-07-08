import React from 'react';
import TaskBar from '../layout/TaskBar.jsx';

const TutorialsScreen = () => (
  <div className="tutorials-screen">
    <TaskBar section="Tutorials" />
    <div className="content-wrapper">
      <h1>📖 Tutorial Hub</h1>
      <p>This is your tutorials center. Widgets and AI agents go here.</p>
    </div>
  </div>
);

export default TutorialsScreen;
