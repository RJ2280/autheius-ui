import React from 'react';

const MistakeHeatmap = ({ lessonId }) => {
  const map = JSON.parse(localStorage.getItem(`${lessonId}-mistakeMap`) || '{}');
  const entries = Object.entries(map);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>🔥 Mistake Heatmap</h3>
      {entries.length === 0 ? (
        <p>No mistakes recorded.</p>
      ) : (
        <ul>
          {entries.map(([q, count], idx) => (
            <li key={idx}>❌ {q}: Missed {count} times</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MistakeHeatmap;
