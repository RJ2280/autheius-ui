import React, { useState } from 'react';

const LessonCard = ({ lesson, userId }) => {
  const [completed, setCompleted] = useState(false);

  const markComplete = () => {
    fetch(`/api/lessons/${lesson.id}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(() => setCompleted(true));
  };

  return (
    <div className={`lesson-card ${completed ? 'done' : ''}`}>
      <h3>{lesson.title}</h3>
      <p>{lesson.objective}</p>
      {!completed && <button onClick={markComplete}>✅ Mark as Done</button>}
    </div>
  );
};

export default LessonCard;
