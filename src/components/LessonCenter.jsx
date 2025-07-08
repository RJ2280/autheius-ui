import React, { useEffect, useState } from 'react';
import LessonCard from './LessonCard';
import LessonEnhancer from './LessonEnhancer';

const LessonCenter = ({ userId }) => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/lessons')
      .then(res => {
        if (!res.ok) throw new Error('Lesson fetch failed');
        return res.json();
      })
      .then(data => setLessons(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>⚠️ {error}</div>;
  if (lessons.length === 0) return <div>📭 No lessons available.</div>;

  return (
    <div className="lesson-center">
      {lessons.map(lesson => (
        <div key={lesson.id} className="lesson-block">
          <LessonCard lesson={lesson} userId={userId} />
          <LessonEnhancer lessonId={lesson.id} />
        </div>
      ))}
    </div>
  );
};

export default LessonCenter;
