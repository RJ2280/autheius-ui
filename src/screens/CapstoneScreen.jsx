import React from 'react';
import TaskBar from '../layout/TaskBar.jsx';
import CapstoneUploader from '../components/CapstoneUploader.jsx';
import './CapstoneScreen.css';

const CapstoneScreen = () => {
  const userId = 'robbie'; // Placeholder user ID

  return (
    <div className="capstone-screen">
      <TaskBar section="Capstone" />
      <div className="content-wrapper">
        <div className="capstone-content">
          <h1>Capstone Project Submission</h1>
          <p>
            This is the final step in your Autheius journey. Upload your completed
            AI agent system project files here. Your project will be evaluated,
            and you'll receive feedback and a certificate of completion.
          </p>
          <CapstoneUploader userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default CapstoneScreen;

