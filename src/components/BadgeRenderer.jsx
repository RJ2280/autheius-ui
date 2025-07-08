import React from 'react';

const BadgeRenderer = ({ badges }) => (
  <div style={{ marginTop: '2rem' }}>
    <h3>🏅 Achievements</h3>
    <ul>
      {badges.perfect_scores.map((l, i) => <li key={i}>🌟 Perfect: {l}</li>)}
      {badges.completion_streaks.map((s, i) => <li key={i}>🔥 Streak: {s} lessons</li>)}
      {badges.all_lessons_passed && <li>🏆 All lessons completed!</li>}
    </ul>
  </div>
);

export default BadgeRenderer;
