import React, { useEffect, useState } from 'react';

const LessonsScreen = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/lessons')
      .then(res => res.json())
      .then(data => {
        setLessons(data.lessons || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Autheius Lessons</h1>
      {loading ? <p>Loading...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {lessons.map(lesson => (
            <li key={lesson.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>{lesson.title}</h3>
              <p>{lesson.summary}</p>
              <a href={`/lessons/${lesson.id}`}>📘 View Full Lesson</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LessonsScreen;
