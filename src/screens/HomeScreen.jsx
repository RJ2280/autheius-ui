import React, { useState } from 'react';
import './home.css';
import SidebarNav from '../components/SidebarNav.jsx';

const HomeScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'home dark' : 'home'}>
      <header className="home-navbar">
        <h1>Autheius AI 🧠</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="mode-toggle">
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <div className="home-layout">
        <SidebarNav />
        <main className="home-main">
          <h2>Welcome to Your Learning Dashboard</h2>
          <p>Start exploring concepts, lessons, quizzes, and more—all powered by your embedded knowledge graph.</p>

          <div className="home-actions">
            <button className="primary-button">🚀 Launch Lessons</button>
            <button className="secondary-button">🧪 Take a Quiz</button>
            <button className="secondary-button">🎓 Start Capstone</button>
          </div>
        </main>
      </div>

      <footer className="home-footer">
        <p>Built with curiosity. Driven by intelligence.</p>
      </footer>
    </div>
  );
};

export default HomeScreen;
