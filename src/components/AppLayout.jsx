import React from 'react';

const AppLayout = ({ children }) => {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#fff',
      color: '#000',
      fontFamily: 'sans-serif',
      minHeight: '100vh'
    }}>
      <header style={{ marginBottom: '1rem' }}>
        <h2>🧠 Autheius Layout</h2>
      </header>
      {children}
    </div>
  );
};

export default AppLayout;
