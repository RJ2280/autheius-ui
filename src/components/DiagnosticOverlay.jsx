import React from 'react';

const DiagnosticOverlay = ({ lessonId, content, tutorial, quizzes, error }) => {
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0,0,0,0.85)',
      color: '#fff',
      fontSize: '14px',
      borderRadius: '8px',
      padding: '1rem',
      zIndex: 9999,
      maxWidth: '300px',
      fontFamily: 'monospace'
    }}>
      <strong>🛠 Diagnostic Overlay</strong>
      <div>🕒 {timestamp}</div>
      <div>📘 lessonId: <code>{lessonId}</code></div>
      <div>📄 content: {content?.length || 0} chars</div>
      <div>📄 tutorial: {tutorial?.length || 0} chars</div>
      <div>🧪 quizzes: {Array.isArray(quizzes) ? quizzes.length : '❌ invalid'}</div>
      {error && <div style={{ color: 'red' }}>⚠️ Error: {error}</div>}
    </div>
  );
};

export default DiagnosticOverlay;
