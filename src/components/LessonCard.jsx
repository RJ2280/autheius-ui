import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LessonCard = ({ lesson, userId, isCompleted }) => {
  // The source of truth for completion now comes from props.
  // We use a local state to manage the optimistic UI update and loading state.
  const [completed, setCompleted] = useState(isCompleted);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const markComplete = async (e) => {
    // Prevent the Link from navigating when the button is clicked
    e.preventDefault();
    e.stopPropagation();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await axios.post(`/api/lessons/${lesson.id}/progress`, { userId });
      setCompleted(true);
    } catch (error) {
      console.error(`Failed to mark lesson ${lesson.id} as complete`, error);
      // Optionally, show an error message to the user
      // If the API call fails, the UI will remain in the "incomplete" state.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Link to={`/lesson/${lesson.id}`} className="lesson-card-link">
      <div className={`lesson-card ${completed ? 'done' : ''}`}>
        <h3>{lesson.title}</h3>
        <p>{lesson.objective}</p>
        {!completed && (
          <button onClick={markComplete} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : '✅ Mark as Done'}
          </button>
        )}
      </div>
    </Link>
  );
};

export default LessonCard;
