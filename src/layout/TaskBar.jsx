import React from 'react';

const TaskBar = ({ section }) => (
  <header className="taskbar">
    <h2>🧭 {section}</h2>
    <div className="actions">
      <button>🔍</button>
      <button>⚙️</button>
    </div>
  </header>
);

export default TaskBar;
