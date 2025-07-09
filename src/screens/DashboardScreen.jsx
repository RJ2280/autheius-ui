import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPencilAlt, FaGraduationCap, FaChalkboardTeacher, FaVideo, FaHistory, FaCog } from 'react-icons/fa';
import './Dashboard.css';

const features = [
  { name: 'Lessons', path: '/lesson-center', icon: <FaBook />, description: 'Browse and complete interactive AI lessons.' },
  { name: 'Quiz', path: '/quiz', icon: <FaPencilAlt />, description: 'Test your knowledge with dynamic quizzes.' },
  { name: 'Capstone', path: '/capstone', icon: <FaGraduationCap />, description: 'Submit your final project for evaluation.' },
  { name: 'Tutorials', path: '/tutorials', icon: <FaChalkboardTeacher />, description: 'Watch video tutorials and guides.' },
  { name: 'Video Builder', path: '/video-builder', icon: <FaVideo />, description: 'Create videos from text with AI.' },
  { name: 'History', path: '/video-history', icon: <FaHistory />, description: 'Review your generated videos and projects.' },
  { name: 'Settings', path: '/settings', icon: <FaCog />, description: 'Configure your Autheius experience.' },
];

const DashboardScreen = () => (
  <div className="dashboard-container">
    <header className="dashboard-header">
      <h1>Autheius Control Center</h1>
      <p>Your central hub for mastering AI and agentic systems.</p>
    </header>
    <div className="dashboard-grid">
      {features.map(feature => (
        <Link to={feature.path} key={feature.name} className="feature-card-link">
          <div className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h2>{feature.name}</h2>
            <p>{feature.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default DashboardScreen;
