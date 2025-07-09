import React from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useLessonStore } from '../state/lessonStore';

export const TutorPanel = ({ lessonContent }) => {
  const { summary, isLoadingSummary, fetchSummary } = useLessonStore();

  const handleSummarize = () => {
    if (lessonContent) {
      fetchSummary(lessonContent);
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 3 }} elevation={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AutoAwesomeIcon color="primary" />
        <Typography variant="h6">A.U.T.H.E.I.U.S. Tutor</Typography>
      </Box>
      <Button onClick={handleSummarize} variant="contained" disabled={isLoadingSummary}>
        {isLoadingSummary ? <CircularProgress size={24} /> : 'Summarize this Lesson'}
      </Button>
      {summary && (
        <Alert severity="info" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
          {summary}
        </Alert>
      )}
    </Paper>
  );
};

