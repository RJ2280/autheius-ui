import React from 'react';

const ProgressTracker = () => {
  const totalLessons = 50;
  const completed = Array.from({ length: totalLessons }, (_, i) => {
    const id = `lesson${String(i + 1).padStart(2, '0')}`;
    return localStorage.getItem(`${id}-completed`) === 'true';
  }).filter(Boolean).length;
  const percent = Math.round((completed / totalLessons) * 100);

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f4f4f4'
    }}>
      <h3>📊 Your Progress</h3>
      <p>${completed} of ${totalLessons} lessons completed</p>
      <div style={{
        height: '20px',
        background: '#ddd',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percent}%`,
          background: '#4caf50',
          height: '100%',
          transition: 'width 0.3s'
        }} />
      </div>
    </div>
  );
};

export default ProgressTracker;
