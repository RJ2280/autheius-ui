import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress, Alert, Grid } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLessonStore } from '../state/lessonStore';
import { TutorPanel } from '../components/TutorPanel';
import MediaPlayer from '../components/MediaPlayer';
import QuizRenderer from '../components/QuizRenderer';

const LessonPage = () => {
  const { lessonId } = useParams();
  const {
    currentLesson,
    isLoadingLesson,
    error,
    fetchLesson,
    clearLesson,
  } = useLessonStore();

  useEffect(() => {
    if (lessonId) {
      fetchLesson(lessonId);
    }
    // When the component unmounts or the lessonId changes, clear the old lesson data.
    return () => {
      clearLesson();
    };
  }, [lessonId, fetchLesson, clearLesson]);

  if (isLoadingLesson) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  if (!currentLesson) {
    return <Typography sx={{ p: 2 }}>Lesson not found.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{currentLesson.title}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentLesson.content}</ReactMarkdown>
          </Paper>
          {currentLesson.quiz && currentLesson.quiz.questions && (
            <QuizRenderer quizData={currentLesson.quiz} />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {currentLesson.youtubeId && <MediaPlayer videoId={currentLesson.youtubeId} />}
          <TutorPanel lessonContent={currentLesson.content} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LessonPage;
