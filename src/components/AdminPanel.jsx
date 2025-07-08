import React from 'react';

const AdminPanel = () => {
  const rehydrateLessons = () => {
    fetch('/admin/hydrate-lessons', { method: 'POST' })
      .then(res => res.ok ? alert('Lessons hydrated!') : alert('Hydration failed.'));
  };

  return (
    <div style={{ padding: '2rem', border: '1px solid #ddd' }}>
      <h2>🛠 Admin Tools</h2>
      <button onClick={rehydrateLessons}>Rehydrate Lessons</button>
    </div>
  );
};

export default AdminPanel;
