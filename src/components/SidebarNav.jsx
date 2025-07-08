import React from 'react';
import { Link } from 'react-router-dom';

const SidebarNav = () => (
  <aside style={{
    background: "#222",
    color: "#fff",
    padding: "1rem",
    minWidth: "220px"
  }}>
    <nav>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="/lessons">📚 Lessons</Link></li>
        <li><Link to="/quiz">🧪 Quiz</Link></li>
        <li><Link to="/capstone">🎓 Capstone</Link></li>
        <li><Link to="/tutorials">📖 Tutorials</Link></li>
        <li><Link to="/video">🎬 Video Builder</Link></li>
        <li><Link to="/videos">📼 Video History</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
      </ul>
    </nav>
  </aside>
);

export default SidebarNav;
