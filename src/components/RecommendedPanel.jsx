import React, { useEffect, useState } from 'react';

const RecommendedPanel = ({ userId }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(`/api/recommendations?user=${userId}`)
      .then(res => res.json())
      .then(data => setLessons(data.recommendations || []));
  }, [userId]);

  return (
    <div className="recommended-panel">
      <h2>🔮 Recommended Lessons</h2>
      <ul>
        {lessons.map(l => (
          <li key={l.id}>{l.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedPanel;
