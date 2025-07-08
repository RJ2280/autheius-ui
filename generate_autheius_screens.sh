#!/bin/bash

echo "🧠 Rebuilding Autheius screens from scratch..."

mkdir -p src/screens src/layout

# Generate TaskBar layout component
cat <<EOF > src/layout/TaskBar.jsx
import React from 'react';

const TaskBar = ({ section }) => (
  <header className="taskbar">
    <h2>🧭 {section}</h2>
    <div className="actions">
      <button>🔍 Search</button>
      <button>⚙️ Settings</button>
    </div>
  </header>
);

export default TaskBar;
EOF

# Define screen names and emojis
declare -A screens=(
  ["Dashboard"]="🧠 Welcome to Autheius"
  ["Lessons"]="📚 Lesson Explorer"
  ["Quiz"]="🧪 Quiz Center"
  ["Capstone"]="🎓 Capstone Showcase"
  ["Tutorials"]="📖 Tutorials"
  ["VideoBuilder"]="🎬 Video Builder"
  ["VideoHistory"]="📼 Video Archive"
  ["Settings"]="⚙️ Settings Panel"
)

# Create each screen file
for name in "${!screens[@]}"; do
  title="${screens[$name]}"
  file="src/screens/${name}Screen.jsx"

  # Screens that support TaskBar
  if [[ "$name" =~ ^(Dashboard|Lessons|Tutorials)$ ]]; then
    cat <<EOF > "$file"
import React from 'react';
import TaskBar from '../layout/TaskBar.jsx';

const ${name}Screen = () => (
  <div className="${name.toLowerCase()}-screen">
    <TaskBar section="${name}" />
    <div className="content-wrapper">
      <h1>${title}</h1>
      <p>This is your ${name.toLowerCase()} screen with contextual layout and navigation.</p>
    </div>
  </div>
);

export default ${name}Screen;
EOF
  else
    cat <<EOF > "$file"
import React from 'react';

const ${name}Screen = () => (
  <div style={{
    padding: "2rem",
    background: "#050025",
    color: "#ECEBFF",
    minHeight: "100vh"
  }}>
    <h1>${title}</h1>
    <p>This is your ${name.toLowerCase()} screen. Content and tools coming soon.</p>
  </div>
);

export default ${name}Screen;
EOF
  fi

  echo "✅ Created ${name}Screen.jsx"
done

echo "🎉 All Autheius screens rebuilt. You’re ready to light it up!"
