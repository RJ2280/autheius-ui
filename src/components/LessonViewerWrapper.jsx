import React from 'react';
import { useParams } from 'react-router-dom';
import LessonViewer from './LessonViewer';

const LessonViewerWrapper = () => {
  const { id } = useParams();
  return <LessonViewer lessonId={id} />;
};

export default LessonViewerWrapper;

