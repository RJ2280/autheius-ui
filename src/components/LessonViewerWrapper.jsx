import React from 'react';
import { useParams } from 'react-router-dom';
import LessonViewer from './LessonViewer.jsx';

const LessonViewerWrapper = () => {
  const { id } = useParams();

  // 🧠 Validate and normalize lesson ID
  let lessonId = 'lesson01'; // Default fallback

  if (id) {
    const num = parseInt(id, 10);
    if (!isNaN(num) && num >= 1 && num <= 53) {
      const padded = String(num).padStart(2, '0');
      lessonId = `lesson${padded}`;
    }
  }

  console.log(`🧭 Routing to: ${lessonId}`);
  return <LessonViewer lessonId={lessonId} />;
};

export default LessonViewerWrapper;
