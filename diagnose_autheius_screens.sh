#!/bin/bash

echo "🔍 Scanning Autheius UI for missing screens..."

cd src || { echo "❌ Directory 'autheius-ui/src' not found."; exit 1; }

mkdir -p screens layout

# 1️⃣ Define expected screens
expected_screens=(Dashboard Lessons Quiz Capstone Tutorials VideoBuilder VideoHistory Settings)

missing=()

# 2️⃣ Scan for missing files
for name in "${expected_screens[@]}"; do
  file="screens/${name}Screen.jsx"
  if [ ! -f "$file" ]; then
    echo "⚠️ Missing: $file"
    missing+=("$name")
  fi
done

# 3️⃣ Regenerate missing screens with placeholder content
if [ ${#missing[@]} -eq 0 ]; then
  echo "✅ All expected screens are present."
else
  echo "🛠 Recreating missing screen files..."
  for name in "${missing[@]}"; do
    cat <<EOF > screens/${name}Screen.jsx
import React from 'react';
import TaskBar from '../layout/TaskBar.jsx';

const ${name}Screen = () => (
  <div className="${name.toLowerCase()}-screen">
    <TaskBar section="${name}" />
    <div className="content-wrapper">
      <h1>${name} Center</h1>
      <p>This screen hosts ${name.toLowerCase()} functionality.</p>
    </div>
  </div>
);

export default ${name}Screen;
EOF
    echo "✅ Regenerated: screens/${name}Screen.jsx"
  done
fi

echo "🏁 Screen diagnostic complete."
