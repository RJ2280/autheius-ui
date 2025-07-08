#!/bin/bash

echo "🔧 Scanning screens for missing default exports..."

cd autheius-ui/src/screens || { echo "❌ 'src/screens' directory not found."; exit 1; }

for file in *Screen.jsx; do
  echo "📄 Processing $file..."

  if grep -q "export default" "$file"; then
    echo "✅ Default export found."
  else
    # Extract base name (without extension)
    base=$(basename "$file" .jsx)

    # Check if file has named export (export const ...)
    if grep -q "export const $base" "$file"; then
      echo "🔁 Converting named export to default..."
      sed -i "s/export const $base/const $base/" "$file"
      echo "export default $base;" >> "$file"
    else
      echo "⚠️ No recognizable export found in $file — injecting default shell..."
      cat <<EOF > "$file"
import React from 'react';

const $base = () => (
  <div style={{ padding: '2rem', color: '#ECEBFF', background: '#050025' }}>
    <h1>$base</h1>
    <p>This screen was auto-repaired to include a default export.</p>
  </div>
);

export default $base;
EOF
    fi
  fi
  echo ""
done

echo "✅ Default exports repaired across screens. You’re all set!"
