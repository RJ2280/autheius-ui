import React from 'react';
import { useNavigate } from 'react-router-dom';

const LessonCenter = () => {
  const navigate = useNavigate();

  const lessons = Array.from({ length: 50 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    return {
      id: `lesson${num}`,
      title: `Lesson ${num}`,
      objective: `Explore foundational concepts of AI — Phase ${num}`
    };
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 AI Lessons Dashboard</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {lessons.map(lesson => (
          <div
            key={lesson.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              background: '#f9f9f9',
              cursor: 'pointer',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.05)'
            }}
            onClick={() => navigate(`/lesson/${lesson.id}`)}
          >
            <h2 style={{ marginBottom: '0.5rem' }}>{lesson.title}</h2>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>{lesson.objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonCenter;
