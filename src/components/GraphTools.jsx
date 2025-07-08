import React, { useState } from 'react';

const GraphTools = () => {
  const [concept, setConcept] = useState('');
  const [lessons, setLessons] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLessons = async () => {
    setLoading(true);
    const res = await fetch(`/api/neo4j/concept/${concept}`);
    const data = await res.json();
    setLessons(data.lessons || []);
    setLoading(false);
  };

  const fetchRelated = async () => {
    setLoading(true);
    const res = await fetch(`/api/neo4j/concept/${concept}/related`);
    const data = await res.json();
    setRelated(data.related || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>🧠 Graph Tools</h2>
      <input
        type="text"
        placeholder="Enter concept (e.g. Photosynthesis)"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={fetchLessons} disabled={!concept || loading}>
        🔍 Fetch Lessons
      </button>{' '}
      <button onClick={fetchRelated} disabled={!concept || loading}>
        🧠 Related Concepts
      </button>{' '}
      <a href="/graph.html" target="_blank" rel="noopener noreferrer">
        🌐 View Graph
      </a>

      {loading && <p>Loading...</p>}

      {lessons.length > 0 && (
        <div>
          <h3>📘 Lessons Covering "{concept}"</h3>
          <ul>
            {lessons.map((l, i) => (
              <li key={i}>
                <strong>{l.topic}</strong>: {l.summary}
              </li>
            ))}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h3>🔗 Related Concepts</h3>
          <ul>
            {related.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphTools;
