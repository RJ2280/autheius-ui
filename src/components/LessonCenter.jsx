import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LessonCard from './LessonCard';

const LessonCenter = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const userId = 'robbie'; // Placeholder user ID for progress tracking

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // Fetch lessons and user progress in parallel for speed
        const [lessonsResponse, progressResponse] = await Promise.all([
          axios.get('/api/lessons'),
          axios.get(`/api/users/${userId}/progress`)
        ]);

        setLessons(lessonsResponse.data);
        setCompletedLessons(new Set(progressResponse.data.completedLessonIds));
      } catch (err) {
        setError('Failed to load lessons. Is the chimera-backend server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [userId]); // Rerun if userId changes

  if (loading) {
    return <div className="loading-state">🧠 Synthesizing lesson data from the knowledge graph...</div>;
  }

  if (error) {
    return <div className="error-state">❌ {error}</div>;
  }

  return (
    <div className="lesson-center-grid">
      {lessons.map(lesson => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          userId={userId}
          isCompleted={completedLessons.has(lesson.id)}
        />
      ))}
    </div>
  );
};

export default LessonCenter;