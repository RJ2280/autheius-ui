#!/bin/bash

echo "📁 Creating structured screens and layouts for Autheius..."

cd autheius-ui
mkdir -p src/screens src/components src/layout

# 1️⃣ Create individual screens
for screen in Dashboard Lessons Quiz Capstone Tutorials VideoBuilder VideoHistory Settings
do
  cat <<EOF > src/screens/${screen}Screen.jsx
import React from 'react';
import TaskBar from '../layout/TaskBar.jsx';

const ${screen}Screen = () => (
  <div className="${screen.toLowerCase()}-screen">
    <TaskBar section="${screen}" />
    <div className="content-wrapper">
      <h1>${screen} Center</h1>
      <p>🚧 This screen will host ${screen.toLowerCase()} functionality.</p>
    </div>
  </div>
);

export default ${screen}Screen;
EOF
done

# 2️⃣ Create universal TaskBar
cat <<EOF > src/layout/TaskBar.jsx
import React from 'react';

const TaskBar = ({ section }) => (
  <header className="taskbar">
    <h2>🧭 {section}</h2>
    <div className="actions">
      <button>📤 Export</button>
      <button>⚙️ Settings</button>
    </div>
  </header>
);

export default TaskBar;
EOF

# 3️⃣ Update App.jsx routes
cat <<EOF > src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import SidebarNav from './components/SidebarNav.jsx';

import DashboardScreen from './screens/DashboardScreen.jsx';
import LessonsScreen from './screens/LessonsScreen.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import CapstoneScreen from './screens/CapstoneScreen.jsx';
import TutorialsScreen from './screens/TutorialsScreen.jsx';
import VideoBuilderScreen from './screens/VideoBuilderScreen.jsx';
import VideoHistoryScreen from './screens/VideoHistoryScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';

const App = () => (
  <Router>
    <Navbar />
    <SidebarNav />
    <Routes>
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/lessons" element={<LessonsScreen />} />
      <Route path="/quiz" element={<QuizScreen />} />
      <Route path="/capstone" element={<CapstoneScreen />} />
      <Route path="/tutorials" element={<TutorialsScreen />} />
      <Route path="/video" element={<VideoBuilderScreen />} />
      <Route path="/videos" element={<VideoHistoryScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
    </Routes>
  </Router>
);

export default App;
EOF

# 4️⃣ Inject minimal layout CSS
cat <<EOF >> src/index.css

.taskbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--glass);
  padding: 1rem;
  border-bottom: var(--card-border);
  backdrop-filter: blur(6px);
}

.content-wrapper {
  padding: 2rem;
  background: var(--bg-color);
  color: var(--text-color);
}
EOF

echo "✅ Autheius screens structured, routed, and styled."
