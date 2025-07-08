import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect to lesson center automatically
    navigate('/lesson-center', { replace: true });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔧 Dashboard loaded</h2>
      <p>Redirecting to lesson center...</p>
    </div>
  );
};

export default DashboardScreen;
