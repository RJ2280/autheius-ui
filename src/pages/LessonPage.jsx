import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import LessonViewer from '../components/LessonViewer.jsx';

const LessonPage = () => {
  // Get the lessonId from the URL, e.g., "lesson01"
  const { lessonId } = useParams();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', textTransform: 'capitalize' }}>
        {/* A simple way to format the title from the ID */}
        {lessonId.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
      </Typography>
      {/* The LessonViewer component does the heavy lifting of fetching and displaying content */}
      <LessonViewer lessonId={lessonId} />
    </Box>
  );
};

export default LessonPage;