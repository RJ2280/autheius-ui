import React, { useState } from 'react';

const PortfolioExporter = ({ userId }) => {
  const [docId, setDocId] = useState('');

  const exportPortfolio = () => {
    fetch('/api/agent/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
      .then(res => res.json())
      .then(data => setDocId(data.docId));
  };

  return (
    <div className="portfolio-exporter">
      <h2>📦 Export Your AI Learning Journey</h2>
      <button onClick={exportPortfolio}>Generate Portfolio</button>
      {docId && (
        <p>🗂️ <a href={`https://docs.google.com/document/d/${docId}`} target="_blank" rel="noopener noreferrer">View Portfolio</a></p>
      )}
    </div>
  );
};

export default PortfolioExporter;
