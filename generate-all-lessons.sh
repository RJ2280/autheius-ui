#!/usr/bin/env bash

# This script generates individual lesson folders and a `details.json` file
# for each lesson based on the master `public/data/lessons.json` file.

echo "🚀 Generating lesson folders from lessons.json..."

# --- Configuration ---
# Assume script is run from the project root: autheius-ui/
DATA_DIR="public/data"
JSON_FILE="$DATA_DIR/lessons.json"

# --- Pre-flight Checks ---
# Check if jq is installed, as it's required for JSON parsing.
if ! command -v jq &> /dev/null; then
    echo "❌ Error: 'jq' is not installed. Please install it to continue."
    echo "   (e.g., 'sudo apt-get install jq' or 'brew install jq')"
    exit 1
fi

if [ ! -f "$JSON_FILE" ]; then
  echo "❌ Error: lessons.json not found at '$JSON_FILE'"
  echo "   Please ensure the file exists and you are running this script from the project root."
  exit 1
fi

# --- Generation Logic ---
mkdir -p "$DATA_DIR"

lesson_count=0

# Use process substitution to read from jq. This is more efficient than calling
# jq multiple times inside the loop and avoids subshell issues with the counter.
# The `select(type == "object")` makes the script robust against malformed entries in the JSON array.
# It now reads `level` instead of the non-existent `objective` field.
while IFS=$'\t' read -r id title level; do
  # Skip lessons with no ID or title
  if [ -z "$id" ] || [ "$id" == "null" ] || [ -z "$title" ] || [ "$title" == "null" ]; then
    echo "⚠️ Skipping a lesson due to missing ID or title."
    continue
  fi

  # Use Bash parameter expansion for robustness. This removes the "lesson" prefix
  # and adds a "Lesson" prefix. (e.g., "lesson01" -> "Lesson01")
  formatted_id="Lesson${id#lesson}"
  DIR="$DATA_DIR/${formatted_id}"
  mkdir -p "$DIR"

  # Create a details.json file, mapping the `level` from the source JSON
  # to the `objective` field that the frontend components expect.
  jq -n --arg id "$id" --arg title "$title" --arg objective "$level" \
    '{id: $id, title: $title, objective: $objective}' > "${DIR}/details.json"

  echo "✅ Generated: ${DIR}/details.json"
  ((lesson_count++))

done < <(jq -r '.[] | select(.id and .title) | [.id, .title, .level // ""] | @tsv' "$JSON_FILE")

echo "🎉 Generation complete. $lesson_count lessons were processed."